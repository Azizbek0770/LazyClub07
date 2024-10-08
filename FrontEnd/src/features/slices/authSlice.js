import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

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
    lessonLoading: false,
    lessonError: null,
    tests: [],
    results: [],
    testLoading: false,
    testError: false,
    testMessage: '',
};

try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        initialState.user = JSON.parse(storedUser);
        initialState.isAuthenticated = true;
    }
} catch (error) {
    console.error('Failed to parse user from localStorage', error);
}

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
        const response = await authService.login(userData);
        return response;
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
    return null;
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, thunkAPI) => {
    try {
        return await authService.getUserInfo();
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const UpdateUserInfo = createAsyncThunk('auth/updateUserInfo', async (userData, thunkAPI) => {
    try {
        const response = await authService.UpdateUserInfo(userData);
        const UpdatedUserInfo = await authService.getUserInfo();
        return UpdatedUserInfo;
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const uploadProfilePhoto = createAsyncThunk('auth/uploadProfilePhoto', async (photoData, thunkAPI) => {
    try {
        const response = await authService.uploadProfilePhoto(photoData);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData, thunkAPI) => {
    try {
        return await authService.resetPassword(resetData);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const confirmResetPassword = createAsyncThunk('auth/confirmResetPassword', async (confirmData, thunkAPI) => {
    try {
        return await authService.confirmResetPassword(confirmData);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const activateAccount = createAsyncThunk('auth/activateAccount', async (activationData, thunkAPI) => {
    try {
        return await authService.activateAccount(activationData);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchLessonById = createAsyncThunk('auth/fetchLessonById', async (lessonId, thunkAPI) => {
    try {
        return await authService.fetchLessonById(lessonId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Test related thunks
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
        return await authService.submitTest(answers);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
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
        resetState: (state) => initialState,
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
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isError = false;
                state.isSuccess = true;
                state.isAuthenticated = true;
                state.message = 'Login successful';
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isError = false;
                state.isSuccess = false;
                state.message = 'Logout successful';
                localStorage.removeItem('user');
            })
            .addCase(getUserInfo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'User info fetched successfully';
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(UpdateUserInfo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(UpdateUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload; // Update userInfo with the new data
                state.isError = false;
                state.isSuccess = true;
                state.message = 'User information updated successfully';
            })
            .addCase(UpdateUserInfo.rejected, (state, action) => {
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
                state.user = { ...state.user, profile_photo: action.payload.profile_photo };
            })
            .addCase(uploadProfilePhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resettingPassword = true;
                state.resetPasswordError = null;
                state.isSuccess = false; // Ensure it's reset when starting a new request
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resettingPassword = false;
                state.message = 'Password reset email sent';
                state.isSuccess = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resettingPassword = false;
                state.resetPasswordError = action.payload;
                state.isSuccess = false; // Ensure it's reset if there's an error
            })
            .addCase(confirmResetPassword.pending, (state) => {
                state.resettingPassword = true;
                state.resetPasswordError = null;
            })
            .addCase(confirmResetPassword.fulfilled, (state, action) => {
                state.resettingPassword = false;
                state.message = 'Password reset confirmed';
            })
            .addCase(confirmResetPassword.rejected, (state, action) => {
                state.resettingPassword = false;
                state.resetPasswordError = action.payload;
            })
            .addCase(activateAccount.pending, (state) => {
                state.activatingAccount = true;
                state.activationError = null;
            })
            .addCase(activateAccount.fulfilled, (state, action) => {
                state.activatingAccount = false;
                state.message = 'Account activated successfully';
            })
            .addCase(activateAccount.rejected, (state, action) => {
                state.activatingAccount = false;
                state.activationError = action.payload;
            })
            .addCase(fetchLessonById.pending, (state) => {
                state.lessonLoading = true;
                state.lessonError = null;
            })
            .addCase(fetchLessonById.fulfilled, (state, action) => {
                state.lessonLoading = false;
                state.lesson = action.payload;
            })
            .addCase(fetchLessonById.rejected, (state, action) => {
                state.lessonLoading = false;
                state.lessonError = action.payload;
            })
            // Test related reducers
            .addCase(fetchTests.pending, (state) => {
                state.testLoading = true;
                state.testError = false;
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.testLoading = false;
                state.tests = action.payload;
                state.testError = false;
            })
            .addCase(fetchTests.rejected, (state, action) => {
                state.testLoading = false;
                state.testError = true;
                state.testMessage = action.payload;
            })
            .addCase(submitTest.pending, (state) => {
                state.testLoading = true;
                state.testError = false;
            })
            .addCase(submitTest.fulfilled, (state, action) => {
                state.testLoading = false;
                state.tests = [...state.tests, action.payload];
                state.testError = false;
            })
            .addCase(submitTest.rejected, (state, action) => {
                state.testLoading = false;
                state.testError = true;
                state.testMessage = action.payload;
            })
            .addCase(fetchResults.pending, (state) => {
                state.testLoading = true;
                state.testError = false;
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.testLoading = false;
                state.results = action.payload;
                state.testError = false;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.testLoading = false;
                state.testError = true;
                state.testMessage = action.payload;
            });
    },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
