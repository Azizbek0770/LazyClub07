import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmResetPassword } from './auth/authSlice';
import '../css/respasscon.css';

const ResetPasswordConfirm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    const { uid, token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        dispatch(confirmResetPassword({ uid, token, new_password: password, re_new_password: confirmPassword }));
    };

    // Handle navigation after successful password reset
    React.useEffect(() => {
        if (isSuccess) {
            navigate('/login'); // Navigate to the login page
        }
    }, [isSuccess, navigate]);

    return (
        <div className='reset-password-confirm-container'>
            <h2>Confirm Reset Password</h2>
            {isSuccess && <p className='success-message'>{message}</p>}
            {isError && <p className='error-message'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='password'
                    placeholder='New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {password !== confirmPassword && <p className='error-message'>Passwords do not match</p>}
                <button type='submit' disabled={isLoading || password !== confirmPassword}>
                    {isLoading ? 'Loading...' : 'Confirm Reset'}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordConfirm;
