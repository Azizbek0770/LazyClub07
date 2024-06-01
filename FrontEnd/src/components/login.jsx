import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetState } from './auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/login/login.css';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, isError, message } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        
        // If login is successful, navigate to user panel
        if (!isLoading && !isError) {
            // navigate('/user-panel');
        }

        // Reset the auth state on component unmount
        return () => {
            dispatch(resetState());
        };
    }, [isLoading, isError, message, navigate, dispatch]);

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

                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <br />
                    <p>Forgot password? <Link to="/reset-password">Reset password</Link></p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
