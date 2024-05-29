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

const login = async (userData) => {
    try {
        const response = await axios.post(LOGIN_URL, userData, config);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        handleError(error, 'Login failed');
    }
};

const logout = async () => {
    localStorage.removeItem('user');
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
    try {
        const response = await axios.post(CONFIRM_PASSWORD_URL, confirmData, config);
        return response.data;
    } catch (error) {
        handleError(error, 'Password reset confirmation failed');
    }
};

const activateAccount = async (activationData) => {
    try {
        const response = await axios.post(ACTIVATE_USER_URL, activationData, config);
        return response.data;
    } catch (error) {
        handleError(error, 'Account activation failed');
    }
};

const handleError = (error, defaultMessage) => {
    if (error.response) {
        console.error('Response error:', error.response.data);
        throw new Error(error.response.data.detail || defaultMessage);
    } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
    } else {
        console.error('Error setup:', error.message);
        throw new Error('Request setup error');
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
