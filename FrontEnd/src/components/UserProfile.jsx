import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePhoto } from './auth/authSlice';
import '../css/userprofile.css';

const UserProfile = () => {
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhoto(selectedPhoto);

        if (selectedPhoto) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(selectedPhoto);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (photo) {
            const formData = new FormData();
            formData.append('profile_photo', photo);
            dispatch(uploadProfilePhoto(formData));
        }
    };

    return (
        <div className="user-profile-container">
            <h2>Upload Profile Photo</h2>
            <form className="upload-form" onSubmit={handleSubmit}>
                <label htmlFor="profile-photo">Choose Photo</label>
                <input type="file" id="profile-photo" onChange={handlePhotoChange} accept="image/*" />
                <button type="submit">Upload</button>
            </form>
            {isLoading && <p>Uploading...</p>}
            {isError && <p>{message}</p>}
            {isSuccess && <p>Profile photo updated successfully</p>}
            {photoPreview && (
                <div className="photo-preview">
                    <h3>Preview:</h3>
                    <img src={photoPreview} alt="Preview" className="preview-image" />
                </div>
            )}
            {user && user.profile_photo && (
                <div className="user-profile">
                    <h2>User Profile</h2>
                    <img src={user.profile_photo} alt="Profile" className="profile-image" />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
