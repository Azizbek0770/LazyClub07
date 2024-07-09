import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './auth/authSlice';
import '../css/login/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            await dispatch(login(userData));
            navigate('/user-panel');
        } catch (error) {
            console.error('Login error:', error.message);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="body1">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>
                       <h3>Email:</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </label>
                    <hr></hr>
                    <label>
                        <h3>Password:</h3>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </label>
                    <hr></hr>
                    {error && <p className="error-message">{error}</p>}
                    <button className="login-form-button" type="submit">Login</button>
                </form>
                <div className="link-container">
                    <Link to="/reset-password">Forgot Password?</Link>
                </div>
                <div className="link-container">
                    <Link to="/register">Don't have an account? Register</Link>
                </div>
            </div>l
            
        </div>
    );
};

export default Login;
