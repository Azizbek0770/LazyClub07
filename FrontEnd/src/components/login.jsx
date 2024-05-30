// LoginForm.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetState } from './auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/login/login.css';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess && user) {
            navigate('/userpanel');
        }

        dispatch(resetState());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    return (
        <div className="body1">
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
