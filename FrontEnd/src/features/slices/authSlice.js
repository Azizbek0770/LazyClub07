import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { useNotifications } from '../../components/Notification'; // Adjust path accordingly

const handleNotification = (type, message) => {
    useNotifications(message, type);
};

const initialState = {
    user: null,
    userInfo: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isAuthenticated: false,
    message: '',
    resettingPassword: false,
    resetPasswordError: null,
    activatingAccount: false,
    activationError: null,
    lesson: null,
    lessonError: null,
    tests: [],
    testError: null,
    results: [],
    resultsError: null,
};

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, thunkAPI) => {
    try {
        return await authService.getUserInfo();
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (userData, thunkAPI) => {
    try {
        const response = await authService.updateUserInfo(userData);
        handleNotification('success', 'User info updated successfully');
        return response;
    } catch (error) {
        handleNotification('error', 'Updating user info failed');
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

export const uploadProfilePhoto = createAsyncThunk('auth/uploadProfilePhoto', async (photoFile, thunkAPI) => {
    try {
        const response = await authService.uploadProfilePhoto(photoFile);
        handleNotification('success', 'Profile photo uploaded successfully');
        return response;
    } catch (error) {
        handleNotification('error', 'Error uploading profile photo');
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData, thunkAPI) => {
    try {
        const response = await authService.resetPassword(resetData);
        handleNotification('success', 'Password reset email sent successfully');
        return response;
    } catch (error) {
        handleNotification('error', 'Password reset failed');
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

export const confirmResetPassword = createAsyncThunk('auth/confirmResetPassword', async (confirmData, thunkAPI) => {
    try {
        const response = await authService.confirmResetPassword(confirmData);
        handleNotification('success', 'Password reset successfully');
        return response;
    } catch (error) {
        handleNotification('error', 'Password reset confirmation failed');
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

export const activateAccount = createAsyncThunk('auth/activateAccount', async ({ uid, token }, thunkAPI) => {
    try {
        const response = await authService.activateAccount({ uid, token });
        handleNotification('success', 'Account activated successfully');
        return response;
    } catch (error) {
        handleNotification('error', 'Account activation failed');
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

export const fetchLessons = createAsyncThunk('auth/fetchLessons', async (_, thunkAPI) => {
    try {
        return await authService.fetchLessons();
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchLessonById = createAsyncThunk('auth/fetchLessonById', async (id, thunkAPI) => {
    try {
        return await authService.fetchLessonById(id);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchTests = createAsyncThunk('auth/fetchTests', async (_, thunkAPI) => {
    try {
        return await authService.fetchTests();
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const submitTest = createAsyncThunk('auth/submitTest', async (answers, thunkAPI) => {
    try {
        const response = await authService.submitTest(answers);
        handleNotification('success', 'Test submitted successfully');
        return response;
    } catch (error) {
        handleNotification('error', 'Test submission failed');
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

export const fetchResults = createAsyncThunk('auth/fetchResults', async (_, thunkAPI) => {
    try {
        return await authService.fetchResults();
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isError = false;
                state.isSuccess = true;
                state.isAuthenticated = true;
                state.message = 'Registration successful';
                localStorage.setItem('user', JSON.stringify(action.payload));
                
                handleNotification('success', 'Registration successful');
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

                handleNotification('error', action.payload);
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isAuthenticated = true;

                handleNotification('success', 'Login successful');
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

                handleNotification('error', action.payload);
            })
            .addCase(getUserInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadProfilePhoto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            })
            .addCase(uploadProfilePhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resettingPassword = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resettingPassword = false;
                state.isSuccess = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resettingPassword = false;
                state.resetPasswordError = action.payload;
            })
            .addCase(confirmResetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirmResetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(confirmResetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(activateAccount.pending, (state) => {
                state.activatingAccount = true;
            })
            .addCase(activateAccount.fulfilled, (state, action) => {
                state.activatingAccount = false;
                state.isSuccess = true;
            })
            .addCase(activateAccount.rejected, (state, action) => {
                state.activatingAccount = false;
                state.activationError = action.payload;
            })
            .addCase(fetchLessons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lesson = action.payload;
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.lessonError = action.payload;
            })
            .addCase(fetchLessonById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLessonById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lesson = action.payload;
            })
            .addCase(fetchLessonById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.lessonError = action.payload;
            })
            .addCase(fetchTests.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tests = action.payload;
            })
            .addCase(fetchTests.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.testError = action.payload;
            })
            .addCase(submitTest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitTest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(submitTest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.results = action.payload;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.resultsError = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
