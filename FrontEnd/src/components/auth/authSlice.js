import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

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
        return await authService.login(userData);
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

export const fetchLessonByIdThunk = createAsyncThunk('auth/fetchLessonById', async (lessonId, thunkAPI) => {
    try {
        return await authService.fetchLessonById(lessonId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
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
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
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
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resettingPassword = true;
                state.resetPasswordError = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resettingPassword = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resettingPassword = false;
                state.resetPasswordError = action.payload;
            })
            .addCase(confirmResetPassword.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(confirmResetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.message = 'Password reset confirmed';
            })
            .addCase(confirmResetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(activateAccount.pending, (state) => {
                state.activatingAccount = true;
                state.activationError = null;
            })
            .addCase(activateAccount.fulfilled, (state) => {
                state.activatingAccount = false;
            })
            .addCase(activateAccount.rejected, (state, action) => {
                state.activatingAccount = false;
                state.activationError = action.payload;
            })
            .addCase(fetchLessonByIdThunk.pending, (state) => {
                state.lessonLoading = true;
                state.lessonError = null;
            })
            .addCase(fetchLessonByIdThunk.fulfilled, (state, action) => {
                state.lessonLoading = false;
                state.lesson = action.payload;
            })
            .addCase(fetchLessonByIdThunk.rejected, (state, action) => {
                state.lessonLoading = false;
                state.lessonError = action.payload;
            });
    },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
