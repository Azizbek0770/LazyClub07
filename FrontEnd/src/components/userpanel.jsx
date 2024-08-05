import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, logout, uploadProfilePhoto } from './auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../css/userpanel.css';
import UserLogo from '../css/pngwing.com.png';

const UserPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoading, isError, message } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/login');
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (photo) {
            const formData = new FormData();
            formData.append('profile_photo', photo);
            dispatch(uploadProfilePhoto(formData)).then(() => {
                setShowModal(false);
                dispatch(getUserInfo()); // Ensure you refresh user info after upload
            });
            setPhoto(null); // Clear the photo after upload
            setPhotoPreview(null); // Clear the preview
        }
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
                            {userInfo.userphoto ? 'Change User Photo' : 'Set User Photo'}
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

            {/* Modal for uploading profile photo */}
            <div className={`upload-modal ${showModal ? 'active' : ''}`}>
                <div className="upload-modal-content">
                    <span className="upload-modal-close" onClick={() => setShowModal(false)}>&times;</span>
                    <h2 className="form-name2">Upload Profile Photo</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        {photoPreview && (
                            <div className="photo-preview-container">
                                <img src={photoPreview} alt="Photo Preview" className="photo-preview" />
                            </div>
                        )}
                        <button type="submit">Upload</button>
                    </form>
                    {isLoading && <p>Uploading...</p>}
                    {isError && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
