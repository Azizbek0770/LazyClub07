import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmResetPassword } from './auth/authSlice';

const ResetPasswordConfirm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }
    dispatch(confirmResetPassword({ password, confirmPassword }));
  };

  return (
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
  );
};

export default ResetPasswordConfirm;
