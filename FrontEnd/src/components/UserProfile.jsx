import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePhoto } from './auth/authSlice';

const UserProfile = () => {
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
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
        <div>
            <h2>Upload Profile Photo</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handlePhotoChange} />
                <button type="submit">Upload</button>
            </form>
            {isLoading && <p>Uploading...</p>}
            {isError && <p>{message}</p>}
            {isSuccess && <p>Profile photo updated successfully</p>}
            {user && user.profile_photo && (
                <img
                    src={user.profile_photo}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
            )}
        </div>
    );
};

export default UserProfile;
