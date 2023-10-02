import jwt from 'jsonwebtoken';
import config from '../config.js';
import Role from '../models/Role.js';
import User from '../models/User.js';
import ResetPasswordRequest from '../models/ResetPasswordRequest.js';
import { sendMail } from '../utils/mailer.js';
import { getResetPasswordTemplate } from '../mailTemplates/resetPasswordTemplate.js';
import { getConfirmUserTemplate } from '../mailTemplates/confirmUserTemplate.js'

// Create a user by an Admin
export const createUser = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;

		const roleFound = await Role.find({
			name: {
				$in: role
			}
		});

		// Creating a new User
		const user = new User({
			username,
			password,
			email,
			role: roleFound.map((role) => role._id)
		});

		// Encrypting password
		user.password = await User.encryptPassword(user.password);

		// Saving the new user
		const savedUser = await user.save();

		const token = jwt.sign(
			{
				email: savedUser.email
			},
			config.SECRET,
			{
				expiresIn: Number(config.TOKEN_TIMEOUT) // 24 horas
			}
		);
		const template = getConfirmUserTemplate(token);
		await sendMail('Accounts', config.MAIL_USER, email, 'Confirm your account', template);

		return res.status(201).json({
			message: 'User saved succesfully!',
			data: savedUser
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
}

export const confirmUser = async (req, res) => {
	try {
		const { token } = req.params;
		const { email } = jwt.verify(token, config.SECRET);
		const foundUser = await User.findOne({email});
		if(!foundUser)
			return res.status(404).json({
				message: 'User not found.'
			});
		foundUser.emailVerified = true;
		foundUser.save();
		return res.status(200).json({
			message: 'Your account has been verified succesfully.'
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
}

export const getUsers = async (req, res) => {
	try {
		const [ total, data ] = await Promise.all([
      User.countDocuments(),
      User.find().populate('role')
    ]);
		return res.status(200).json({
			total,
			data
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
}

export const getUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		const userFound = await User.findById(userId);

		return userFound ? res.status(200).json(userFound) : res.status(404).json({ message: 'User not found.' });
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
};

export const getUserByToken = async (req, res) => {
	try {
		const userFound = await User.findById(req.userId).populate('role');

		return userFound ? res.status(200).json(userFound) : res.status(404).json({ message: 'User not found.' });
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
};

export const updateUserByIdByAdmin = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			req.body
		);
		return res.status(201).json({
			message: 'User has been updated succesfully.',
			data: updatedUser
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
};

export const updateUserById = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			req.body
		);
		return res.status(200).json({
			message: 'User has been updated succesfully.',
			data: updatedUser
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
};

export const deleteUserById = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.userId);
		return res.status(200).json({
			message: 'User has been deleted succesfully.',
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
};

export const deleteUserByIdByAdmin = async (req, res) => {
	try {
		const { userId } = req.params;

		await User.findByIdAndDelete(userId);
		return res.status(200).json({
			message: 'User has been deleted succesfully.',
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
};

// Change Password
export const changePassword = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		const { newPassword, password } = req.body;
		const matchPassword = await User.comparePassword(password, user.password);
		if(!matchPassword)
			return res.status(401).json({
				message: 'Wrong password.',
				token: null
			});
		else{
			const newPasswordEncrypted =  await User.encryptPassword(newPassword);
			const updatedUser = await User.findByIdAndUpdate(
				req.userId,
				{ password: newPasswordEncrypted }
			);
			return res.status(201).json({
				message: 'Passwod has been updated succesfully.',
				data: updatedUser
			});
		}
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
}

// Reset Password - Request Mail
export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const userFound = await User.findOne({
			email
		});
		if(!userFound)
			return res.status(404).json({
				message: 'There is not an user registered with the email that has been entered.'
			});
		// Create a new entry with Id and Mail on table ('ResetPasswordRequest')
		const request = new ResetPasswordRequest({
			referencedEmail: userFound.email
		});
		await request.save();
		// Send mail with reset url + id
		// Obtain Reset Password template
		const template = getResetPasswordTemplate(request._id);
		const mailId = await sendResetPasswordMail('Accounts', config.MAIL_USER, email, 'Reset Password', template);

		if(mailId)
			return res.status(200).json({
				message: 'A mail with instructions for reset your password has been sended.',
				data: request
			});

	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
}

// Reset Password - Save new Password
export const resetPassword = async (req, res) => {
	try {
		const { newPassword } = req.body;
		const { requestId } = req.params;
		const requestFound = await ResetPasswordRequest.findById(requestId);

		if(!requestFound)
			return res.status(404).json({
				message: 'Link that you are trying to reach is not valid.'
			});

		const user = await User.findOne({
			email: requestFound.referencedEmail
		});
		const newPasswordEncrypted =  await User.encryptPassword(newPassword);
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ password: newPasswordEncrypted }
		);
		// TODO: Update entry on ('ResetPasswordRequest') with a validator
		
		return res.status(201).json({
			message: 'Password updated succesfully.',
			data: updatedUser
		});
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: error });
	}
}