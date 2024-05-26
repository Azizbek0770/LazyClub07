// userpanel.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from './auth/authSlice';
import '../css/userpanel.css';

const UserPanel = () => {
    const dispatch = useDispatch();
    const { user, userInfo, isLoading, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getUserInfo());
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="user-panel">
            <h1>Welcome to the Profile</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <p>Error loading user information: {message}</p>
            ) : (
                userInfo && (
                    <div className="profile-container">
                        <div className="user-info">
                            <h2>About You:</h2>
                            <div className="info-item">
                                <span className="info-label">First Name:</span>
                                <span className="info-value">{userInfo.first_name}</span>
                            </div>
                            {/* Additional user info rendering */}
                        </div>
                        {/* Additional profile rendering */}
                    </div>
                )
            )}
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default UserPanel;
