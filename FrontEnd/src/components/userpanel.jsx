// src/components/userpanel.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, logout } from './auth/authSlice';
import '../css/userpanel.css';

const UserPanel = () => {
    const dispatch = useDispatch();
    const { userInfo, isLoading, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (isLoading) {
        return <p>Loading user data...</p>;
    }

    if (isError) {
        return (
            <div className="user-panel-container">
                <h2>User Panel</h2>
                <p>Error: {message}</p>
            </div>
        );
    }

    return (
        <div className='body5'>
         <div className="user-panel-container">
            <h2 className='formname'>User Panel</h2>
            <hr className='hr1'></hr>
            {userInfo ? (
                <div className="user-data">
                    <p>First Name: {userInfo.first_name}</p>
                    <p>Last Name: {userInfo.last_name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Username: {userInfo.username}</p>
                    <p>Gender: {userInfo.gender}</p>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
 </div>
    );
};

export default UserPanel;
