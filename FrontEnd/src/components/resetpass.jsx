// ResetPassword.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './auth/authSlice';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {isSuccess && <p className="success-message">{message}</p>}
      {isError && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
