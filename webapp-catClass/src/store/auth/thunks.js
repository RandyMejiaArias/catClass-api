import catClassApi from '../../api/CatClassApi';

import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, username}) => {
    return async (dispatch) => {
        console.log('startCreatingUserWithEmailPassword')
        dispatch(checkingCredentials());
        try {
            const dataToSend = { email, password, username };
            dataToSend.role = 'user';
            const { data, status } = await catClassApi.post(
                'auth/signup',
                dataToSend
            )
            if(status === 201) dispatch(logout( {errorMessage: data.message} ));
        } catch ({ response, request, message }) {
            console.log({ response, request, message })
            if(response) {
                const { data, status } = response;
                dispatch(logout({ errorMessage: data.message }))
            }else if(request) {
                dispatch(logout())
            }else 
                dispatch(logout({ errorMessage: message }))
        }
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        
        try {
            const dataToSend = { email, password };
            const { data:signInData, status:signInStatus } = await catClassApi.post(
                'auth/signin',
                dataToSend
            )
            const { token } = signInData.data;

            localStorage.setItem('userToken', token);

            const { data: userData, status } = await catClassApi.get(
                'users/me'
            )

            const { emailVerified, role, username, _id } = userData

            if(!userData) return dispatch(logout({errorMessage}));
    
            dispatch(login({_id, email, username }));
        } catch ({ response, request, message }) {
            if(response) {
                const { data, status } = response;
                dispatch(logout({ errorMessage: data.message }))
            }else if(request) {
                dispatch(logout())
            }else 
                dispatch(logout({ errorMessage: message }))
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}