// authService.jsx
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
        console.log(error.response.data); 
        throw error;
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post(LOGIN_URL, userData, config);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with an error:', error.response.data);
        } else {
            console.error('Error sending request:', error.message);
        }
        throw error;
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
        throw error;
    }
};

const resetPassword = async (resetData) => {
    try {
        // Check if the password and confirmation password match
        if (resetData.new_password !== resetData.confirm_password) {
            throw new Error("Passwords don't match");
        }

        // Make a request to reset password
        const response = await axios.post(RESET_PASSWORD_URL, resetData, config);
        // Return the response
        return response.data;
    } catch (error) {
        throw error;
    }
};

const confirmResetPassword = async (confirmData) => {
    try {
        // Make a request to confirm the password reset
        const response = await axios.post(CONFIRM_PASSWORD_URL, confirmData, config);
        // Return the response
        return response.data;
    } catch (error) {
        throw error;
    }
};

const activateAccount = async (activationData) => {
    try {
        const response = await axios.post(ACTIVATE_USER_URL, activationData, config);
        return response;
    } catch (error) {
        throw error;
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
