import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import '../css/reset-password.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }));
    };

    useEffect(() => {
        if (isSuccess) {
            // Extract uid and token from the message (assuming your backend sends them in the response)
            const { uid, token } = message; // Adjust this according to your backend response structure
            navigate(`/password/reset/confirm/${uid}/${token}`);
        }
    }, [isSuccess, navigate, message]);

    return (
        <div className='reset-password-body'>
            <div className='reset-password-container'>
                <h2 className='reset-password-title'>Reset Password</h2>
                {isSuccess && <p className='success-message'>{message}</p>}
                {isError && <p className='error-message'>Error sending email!</p>}
                <form className='reset-password-form' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? <Spinner /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
