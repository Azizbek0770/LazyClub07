import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userInfo: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    resettingPassword: false,
    resetPasswordError: null,
    activatingAccount: false,
    activationError: null,
};

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await authService.register(userData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await authService.login(userData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
    return null;
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.user ? state.auth.user.access : null;
        const response = await authService.getUserInfo(token);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const resetPassword = createAsyncThunk('auth/reset-password', async (resetData, thunkAPI) => {
    try {
        const response = await authService.resetPassword(resetData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const confirmResetPassword = createAsyncThunk('auth/confirm-reset-password', async (confirmData, thunkAPI) => {
    try {
        const response = await authService.confirmResetPassword(confirmData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const activateAccount = createAsyncThunk('auth/activate', async (activationData, thunkAPI) => {
    try {
        const response = await authService.activateAccount(activationData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
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
                state.message = 'Registration successful';
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
                state.message = 'Login successful';
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
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
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resettingPassword = false;
                state.isSuccess = true;
                state.message = 'Password reset email sent';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resettingPassword = false;
                state.resetPasswordError = action.payload;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(confirmResetPassword.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(confirmResetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Password reset successful';
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
                state.isSuccess = true;
                state.message = 'Account activated successfully';
            })
            .addCase(activateAccount.rejected, (state, action) => {
                state.activatingAccount = false;
                state.activationError = action.payload;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
