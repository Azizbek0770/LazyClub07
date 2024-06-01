import axios from 'axios';

const BACKEND_DOMAIN = 'http://127.0.0.1:8000';

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`;
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`;
const CONFIRM_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;
const USER_INFO_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`;
const ACTIVATE_USER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`;

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const handleError = (error, defaultMessage) => {
    if (error.response) {
        if (error.response.data) {
            console.error('Response error:', error.response.data);
            if (error.response.data.detail) {
                throw new Error(error.response.data.detail);
            } else if (error.response.data.email) {
                console.error('Email error:', error.response.data.email);
                throw new Error(`Email error: ${error.response.data.email.join(' ')}`);
            } else if (Array.isArray(error.response.data.uid) && Array.isArray(error.response.data.token)) {
                console.error('Error with UID and token:', error.response.data);
                throw new Error('Error with UID and token');
            } else {
                throw new Error(defaultMessage);
            }
        } else {
            console.error('Response error without data:', error.response);
            throw new Error(defaultMessage);
        }
    } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
    } else {
        console.error('Error setup:', error.message);
        throw new Error('Request setup error');
    }
};
const register = async (userData) => {
    try {
        const response = await axios.post(REGISTER_URL, userData, config);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        handleError(error, 'Registration failed');
    }
};

const login = async (loginData) => {
    const { email, password } = loginData;
    console.log('Attempting to login with:', { email, password });
    try {
        const response = await axios.post(LOGIN_URL, { email, password }, config);
        return response.data;
    } catch (error) {
        handleError(error, 'Login failed');
    }
};

const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
};

const getUserInfo = async (token) => {
    try {
        const response = await axios.get(USER_INFO_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Response error getting user info:', error.response.data);
        throw error;
    }
};

const resetPassword = async (resetData) => {
    try {
        const response = await axios.post(RESET_PASSWORD_URL, resetData, config);
        return response.data;
    } catch (error) {
        handleError(error, 'Password reset failed');
    }
};

const confirmResetPassword = async (confirmData) => {
    const { uid, token, new_password, re_new_password } = confirmData;
    console.log('Sending data:', { uid, token, new_password, re_new_password });
    try {
        const response = await axios.post(CONFIRM_PASSWORD_URL, {
            uid,
            token,
            new_password,
            re_new_password,
        }, config);
        return response.data;
    } catch (error) {
        handleError(error, 'Password reset confirmation failed');
    }
};

const activateAccount = async (activationData) => {
    const { uid, token } = activationData;
    console.log('Sending activation data:', { uid, token });
    try {
        if (!uid || !token || uid.length === 0 || token.length === 0) {
            return 'UID or token is null or empty';
        }
        const response = await axios.post(ACTIVATE_USER_URL, { uid, token }, config);
        return response.data;
    } catch (error) {
        return handleError(error, 'Account activation failed');
    }
};

const authService = {
    register,
    login,
    logout,
    getUserInfo,
    resetPassword,
    confirmResetPassword,
    activateAccount,
};

export default authService;
