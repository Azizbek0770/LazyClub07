import axios from 'axios';
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken } from '../../redux/accessStore';
import { logout } from '../slices/authSlice';

const BACKEND_DOMAIN = 'http://127.0.0.1:8000';
const AUTH_API_URL = `${BACKEND_DOMAIN}/api/v1/auth`;

const axiosInstance = axios.create({
    baseURL: AUTH_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            getStore().dispatch(logout());
        }
        return Promise.reject(error);
    }
);

const handleError = (error, defaultMessage, notify) => {
    if (error.response) {
        console.error('Response error:', error.response.data);
        notify(error.response.data.detail || defaultMessage, 'error');
        throw new Error(error.response.data.detail || defaultMessage);
    } else if (error.request) {
        console.error('No response received:', error.request);
        notify('No response received from server', 'error');
        throw new Error('No response received from server');
    } else {
        console.error('Error setup:', error.message);
        notify('Request setup error', 'error');
        throw new Error('Request setup error');
    }
};

const getToken = () => {
    try {
        const token = getAccessToken();
        console.log('Token:', token); // Add this line to inspect the token
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

const authService = {
    register: async (userData, notify) => {
        const REGISTER_URL = `${AUTH_API_URL}/users/`;
        try {
            const response = await axios.post(REGISTER_URL, userData);
            notify('Registration successful', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Registration failed', notify);
        }
    },

    login: async (userData, notify) => {
        const LOGIN_URL = `${AUTH_API_URL}/jwt/create/`;
        try {
            const response = await axios.post(LOGIN_URL, userData);
            if (response.data.access) {
                setAccessToken(response.data.access);
            }
            if (response.data.refresh) {
                setRefreshToken(response.data.refresh);
            }
            notify('Login successful', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Login failed', notify);
        }
    },

    logout: async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },

    getUserInfo: async (notify) => {
        const USER_INFO_URL = `${AUTH_API_URL}/users/me/`;
        try {
            const response = await axiosInstance.get(USER_INFO_URL, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching user info failed', notify);
        }
    },

    updateUserInfo: async (userData, notify) => {
        const API_URL = `${AUTH_API_URL}/users/me/`;
        const token = getToken();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.put(API_URL, userData, config);
            notify('User info updated successfully', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Updating user info failed', notify);
        }
    },

    uploadProfilePhoto: async (photoFile, notify) => {
        const UPLOAD_PHOTO_URL = `${AUTH_API_URL}/users/upload_photo/`;
        const formData = new FormData();
        formData.append('userphoto', photoFile);
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        try {
            const response = await axiosInstance.patch(UPLOAD_PHOTO_URL, formData, config);
            notify('Profile photo uploaded successfully', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Error uploading profile photo', notify);
        }
    },

    resetPassword: async (resetData, notify) => {
        const RESET_PASSWORD_URL = `${AUTH_API_URL}/users/reset_password/`;
        try {
            const response = await axiosInstance.post(RESET_PASSWORD_URL, resetData);
            notify('Password reset email sent successfully', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Password reset failed', notify);
        }
    },

    confirmResetPassword: async (confirmData, notify) => {
        const CONFIRM_RESET_PASSWORD_URL = `${AUTH_API_URL}/users/reset_password_confirm/`;
        try {
            const response = await axiosInstance.post(CONFIRM_RESET_PASSWORD_URL, confirmData);
            notify('Password reset successfully', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Password reset confirmation failed', notify);
        }
    },

    activateAccount: async ({ uid, token }, notify) => {
        const ACTIVATE_ACCOUNT_URL = `${AUTH_API_URL}/users/activation/`;
        const activateData = { uid, token };
        try {
            const response = await axiosInstance.post(ACTIVATE_ACCOUNT_URL, activateData);
            notify('Account activated successfully', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Account activation failed', notify);
        }
    },

    fetchLessons: async (notify) => {
        const FETCH_LESSONS_URL = `${BACKEND_DOMAIN}/api/lessons/`;
        try {
            const response = await axiosInstance.get(FETCH_LESSONS_URL, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching lessons failed', notify);
        }
    },

    fetchLessonById: async (id, notify) => {
        const FETCH_LESSON_BY_ID_URL = `${BACKEND_DOMAIN}/api/lessons/${id}/`;
        try {
            const response = await axiosInstance.get(FETCH_LESSON_BY_ID_URL, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching lesson failed', notify);
        }
    },

    fetchTests: async (notify) => {
        const FETCH_TESTS_URL = `${BACKEND_DOMAIN}/api/tests/`;
        try {
            const response = await axiosInstance.get(FETCH_TESTS_URL, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            console.log('Fetch tests response:', response.data); // This should log an array
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching tests failed', notify);
        }
    },

    submitTest: async (answers, notify) => {
        const SUBMIT_TEST_URL = `${BACKEND_DOMAIN}/api/tests/submit/`;
        try {
            const response = await axiosInstance.post(SUBMIT_TEST_URL, answers, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            notify('Test submitted successfully', 'success');
            return response.data;
        } catch (error) {
            handleError(error, 'Submitting test failed', notify);
        }
    },

    fetchResults: async (notify) => {
        const FETCH_RESULTS_URL = `${BACKEND_DOMAIN}/api/results/`;
        try {
            const response = await axiosInstance.get(FETCH_RESULTS_URL, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching results failed', notify);
        }
    },
};

export default authService;
