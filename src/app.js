import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from './config.js';

import pkg from '../package.json' assert {type: 'json'}

import { createRol, createAdmin } from './libs/initialSetup.js';

// Importing Routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

// Initialization
const app = express();

await Promise.all([
	createRol(),
	createAdmin()
]);

// Settings
app.set('pkg', pkg);
app.set('port', config.PORT);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use(express.urlencoded({ extended: false }));

// Welcome Route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to my API',
		name: app.get('pkg').name,
		version: app.get('pkg').version,
		description: app.get('pkg').description,
		author: app.get('pkg').author
	});
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export { app }