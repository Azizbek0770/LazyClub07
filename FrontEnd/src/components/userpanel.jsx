import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, logout } from '../features/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../css/userpanel.css';
import UserLogo from '../css/pngwing.com.png';
import ChangeInfo from './changeuserinfo';

const UserPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoading, isError, message } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/login');
        });
    };

    if (!userInfo) {
        return null; // Prevent rendering if no user info is available
    }

    return (
        <div className="body5">
            <div className="user-panel-container">
                <h2 className="form-name">User Panel</h2>
                <hr className="divider" />
                <div className="profile-section">
                    <div className="logo-container">
                        <img
                            className="logo1"
                            src={userInfo.userphoto ? userInfo.userphoto : UserLogo}
                            alt="User Logo"
                        />
                        <div className="upload-text" onClick={() => setShowModal(true)}>
                            Change User Info
                        </div>
                    </div>
                    <div className="text-info">
                        <div className="user-data">
                            <div><h3>First Name:</h3> <p>{userInfo.first_name}</p></div>
                            <div><h3>Last Name:</h3> <p>{userInfo.last_name}</p></div>
                            <div><h3>Email:</h3> <p>{userInfo.email}</p></div>
                            <div><h3>Username:</h3> <p>{userInfo.username}</p></div>
                            <div><h3>Gender:</h3> <p>{userInfo.gender}</p></div>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for changing user info */}
            <div className={`upload-modal ${showModal ? 'active' : ''}`}>
                <div className="upload-modal-content">
                    <span className="upload-modal-close" onClick={() => setShowModal(false)}>&times;</span>
                    <h2 className="form-name2">Change User Info</h2>
                    <ChangeInfo /> {/* Render ChangeInfo component here */}
                    {isLoading && <p>Updating...</p>}
                    {isError && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
