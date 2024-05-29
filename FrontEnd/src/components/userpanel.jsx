// UserPanel.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './auth/authSlice';

const UserPanel = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="user_panel_container">
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPanel;
