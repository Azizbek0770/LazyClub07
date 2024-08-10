import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import '../css/reset-password.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resettingPassword, resetPasswordError, isSuccess, message } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }));
    };

    useEffect(() => {
        console.log('isSuccess:', isSuccess);
        if (isSuccess) {
            navigate('/checkout');
        }
    }, [isSuccess, navigate]);

    return (
        <div className='reset-password-body'>
            {resettingPassword && <div className='spinner-overlay'><Spinner /></div>}
            <div className='reset-password-container'>
                <h2 className='reset-password-title'>Reset Password</h2>
                {isSuccess && <p className='success-message'>{message}</p>}
                {resetPasswordError && <p className='error-message'>Error sending email!</p>}
                <form className='reset-password-form' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={resettingPassword}>
                        {resettingPassword ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
