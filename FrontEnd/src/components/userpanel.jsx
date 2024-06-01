import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './auth/authSlice';
import '../css/userpanel.css'; // Import the CSS file

const UserPanel = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Check if user exists before accessing its properties
  if (!user) {
    return null; // Render nothing if user is null
  }

  return (
    <div className="user_panel_container">
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPanel;
