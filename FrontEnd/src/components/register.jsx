// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './auth/authService'; // Ensure correct import
import '../css/register.css';
import Spinner from './Spinner.jsx'; // Import your Spinner component

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [gender, setGender] = useState('Male');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            setError('Passwords do not match.');
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
            re_password: rePassword, // Correct field name: re_password
            gender,
        };

        setIsLoading(true);
        try {
            await authService.register(userData);
            navigate('/checkout');
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="body">
            {isLoading && <Spinner />} {/* Display the spinner when loading */}
            <div className="register-container">
                <h2 className="register-title">Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className='passf'>
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="Enter your first name"
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="Enter your last name"
                            />
                        </label>
                    </div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </label>
                    <div className='passf'>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </label>
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                        </label>
                    </div>
                    <label>
                        Gender:
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                    {error && <p className="error">{error}</p>}
                    <button className="register-form-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
