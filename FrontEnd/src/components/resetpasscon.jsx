import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { confirmResetPassword } from './auth/authSlice';
import '../css/respasscon.css';

const ResetPasswordConfirm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uidFromUrl = queryParams.get('uid');
    const tokenFromUrl = queryParams.get('token');
    
    if (uidFromUrl) setUid(uidFromUrl);
    if (tokenFromUrl) setToken(tokenFromUrl);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }
    dispatch(confirmResetPassword({ uid, token, new_password: password, re_new_password: confirmPassword }));
  };

  return (
    <div className='body3'>
      <div className="reset-password-confirm-container">
        <h2>Confirm Reset Password</h2>
        {isSuccess && <p className="success-message">{message}</p>}
        {isError && <p className="error-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password !== confirmPassword && <p className="error-message">Passwords do not match</p>}
          <button type="submit" disabled={isLoading || password !== confirmPassword}>
            {isLoading ? 'Loading...' : 'Confirm Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
