// authSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userInfo: null,
    isLoading: false,
    isError: false,
    message: '',
    resettingPassword: false,
    resetPasswordError: null,
    activatingAccount: false,
    activationError: null,
};

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
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
        return await authService.getUserInfo(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData, thunkAPI) => {
    try {
        await authService.resetPassword(resetData);
        return null; // No data to return after successful reset
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const activateAccount = createAsyncThunk('auth/activateAccount', async (activationData, thunkAPI) => {
    try {
        const response = await authService.activateAccount(activationData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
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
        resetError: (state) => {
            state.isError = false;
            state.message = '';
        },
        startPasswordReset(state) {
            state.resettingPassword = true;
            state.resetPasswordError = null;
        },
        passwordResetSuccess(state) {
            state.resettingPassword = false;
        },
        passwordResetFailure(state, action) {
            state.resettingPassword = false;
            state.resetPasswordError = action.payload;
        },
        startActivatingAccount(state) {
            state.activatingAccount = true;
            state.activationError = null;
        },
        accountActivationSuccess(state) {
            state.activatingAccount = false;
        },
        accountActivationFailure(state, action) {
            state.activatingAccount = false;
            state.activationError = action.payload;
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
                state.message = 'Login successful';
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('user'); // Remove user from local storage on logout
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
            .addCase(resetPassword.fulfilled, (state) => {
                state.resettingPassword = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resettingPassword = false;
                state.resetPasswordError = action.payload;
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
            });
    },
});

export const { resetState, resetError, startPasswordReset, passwordResetSuccess, passwordResetFailure, startActivatingAccount, accountActivationSuccess, accountActivationFailure } = authSlice.actions;
export default authSlice.reducer;
