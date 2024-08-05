import axios from 'axios';

const BACKEND_DOMAIN = 'http://127.0.0.1:8000';
const AUTH_API_URL = `${BACKEND_DOMAIN}/api/v1/auth`;
const LESSON_API_URL = `${BACKEND_DOMAIN}/api/lessons`;
const TEST_API_URL = `${BACKEND_DOMAIN}/test`;
const RESULT_API_URL = `${BACKEND_DOMAIN}/api/results`;

const handleError = (error, defaultMessage) => {
    if (error.response) {
        if (error.response.data) {
            console.error('Response error:', error.response.data);
            throw new Error(JSON.stringify(error.response.data));
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

const authService = {
    register: async (userData) => {
        const REGISTER_URL = `${AUTH_API_URL}/users/`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await axios.post(REGISTER_URL, userData, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Registration failed');
        }
    },

    login: async (userData) => {
        const LOGIN_URL = `${AUTH_API_URL}/jwt/create/`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await axios.post(LOGIN_URL, userData, config);
            if (response.data.access) {
                localStorage.setItem('token', response.data.access);
            }
            if (response.data.refresh) {
                localStorage.setItem('refreshToken', response.data.refresh);
            }
            return response.data;
        } catch (error) {
            handleError(error, 'Login failed');
        }
    },

    logout: async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },

    getUserInfo: async () => {
        const USER_INFO_URL = `${AUTH_API_URL}/users/me/`;
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(USER_INFO_URL, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching user info failed');
        }
    },

    updateUserInfo: async (userData) => {
        const response = await axios.put(AUTH_API_URL + '/user/', userData);
        return response.data;
    },

    uploadProfilePhoto: async (photoFile) => {
        const UPLOAD_PHOTO_URL = `${AUTH_API_URL}/users/upload_photo/`; // Ensure this endpoint is correct
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
    
        const formData = new FormData();
        formData.append('userphoto', photoFile);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };
    
        try {
            const response = await axios.patch(UPLOAD_PHOTO_URL, formData, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Error uploading profile photo');
        }
    },

    resetPassword: async (resetData) => {
        const RESET_PASSWORD_URL = `${AUTH_API_URL}/users/reset_password/`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await axios.post(RESET_PASSWORD_URL, resetData, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Password reset failed');
        }
    },

    confirmResetPassword: async (confirmData) => {
        const CONFIRM_RESET_PASSWORD_URL = `${AUTH_API_URL}/users/reset_password_confirm/`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await axios.post(CONFIRM_RESET_PASSWORD_URL, confirmData, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Password reset confirmation failed');
        }
    },

    activateAccount: async ({ uid, token }) => {
        const ACTIVATE_ACCOUNT_URL = `${AUTH_API_URL}/users/activation/`;
        const activateData = { uid, token };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await axios.post(ACTIVATE_ACCOUNT_URL, activateData, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Account activation failed');
        }
    },

    fetchLessons: async () => {
        const FETCH_LESSONS_URL = LESSON_API_URL;
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(FETCH_LESSONS_URL, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching lessons failed');
        }
    },

    fetchLessonById: async (id) => {
        const FETCH_LESSON_BY_ID_URL = `${LESSON_API_URL}/${id}/`;
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(FETCH_LESSON_BY_ID_URL, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching lesson by ID failed');
        }
    },

    // Test related methods
    fetchTests: async () => {
        try {
            const response = await axios.get(TEST_API_URL);
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching tests failed');
        }
    },

    submitTest: async (answers) => {
        try {
            const response = await axios.post(`${TEST_API_URL}/submit`, { answers });
            return response.data;
        } catch (error) {
            handleError(error, 'Submitting test failed');
        }
    },

    fetchResults: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(RESULT_API_URL, config);
            return response.data;
        } catch (error) {
            handleError(error, 'Fetching results failed');
        }
    }
};

export default authService;
