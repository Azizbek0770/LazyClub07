import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, logout, uploadProfilePhoto } from './auth/authSlice';
import '../css/userpanel.css';
import UserLogo from '../css/pngwing.com.png';

const UserPanel = () => {
    const dispatch = useDispatch();
    const { userInfo, isLoading, isError, message } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
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
            dispatch(uploadProfilePhoto(formData))
                .then(() => {
                    setShowModal(false);
                    dispatch(getUserInfo()); // Ensure you refresh user info after upload
                });
            setPhoto(null); // Clear the photo after upload
            setPhotoPreview(null); // Clear the preview
        }
    };

    return (
        <div className="body5">
            <div className="user-panel-container">
                <h2 className="form-name">User Panel</h2>
                <hr className="divider" />
                <div className="profile-section">
                    <div className="logo-container">
                        <img
                            className="logo1"
                            src={userInfo && userInfo.profile_photo ? userInfo.profile_photo : UserLogo}
                            alt="User Logo"
                        />
                        <div className="upload-text" onClick={() => setShowModal(true)}>Upload Photo</div>
                    </div>
                </div>
                <div className="text-info">
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
            <div className="user-panel-container results-container">
                <h2 className="form-name">Results:</h2>
                <hr className="divider" />
                <div className="results-section">
                    <p className="results-display">Results and details should be displayed here</p>
                </div>
            </div>

            {/* Modal for uploading profile photo */}
            <div className={`upload-modal ${showModal ? 'active' : ''}`}>
                <div className="upload-modal-content">
                    <span className="upload-modal-close" onClick={() => setShowModal(false)}>&times;</span>
                    <h2 className="form-name">Upload Profile Photo</h2>
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
