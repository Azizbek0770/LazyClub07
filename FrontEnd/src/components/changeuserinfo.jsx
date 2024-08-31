import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, UpdateUserInfo } from '../features/slices/authSlice'; // Adjust path if necessary
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../contexts/notificationcontext'; // Adjust path if necessary
import '../css/changeuserinfo.css'; // Adjust path if necessary

const ChangeInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addNotification } = useNotificationContext(); // Use notification context here
    const { userInfo, isLoading, isError, message } = useSelector((state) => state.auth);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.first_name || '');
            setLastName(userInfo.last_name || '');
            setEmail(userInfo.email || '');
            setUsername(userInfo.username || '');
            setGender(userInfo.gender || '');
        }
    }, [userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedInfo = {
            first_name: firstName,
            last_name: lastName,
            email,
            username,
            gender
        };
        dispatch(UpdateUserInfo(updatedInfo)).then(() => {
            addNotification('User info updated successfully!', 'success');
            navigate('/user-panel'); // Redirect to user panel after updating info
        }).catch(() => {
            addNotification('Error updating user info', 'error');
        });
    };

    if (!userInfo) {
        return null; // Prevent rendering if no user info is available
    }

    return (
        <div className="change-info-container">
            <h2 className="change-info-header">Change User Info</h2>
            <hr className="change-info-divider" />
            <form onSubmit={handleSubmit}>
                <div className="change-info-form-group">
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                </div>
                <div className="change-info-form-group">
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                </div>
                <div className="change-info-form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="change-info-form-group">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="change-info-form-group">
                    <label>Gender:</label>
                    <input 
                        type="text" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                    />
                </div>
                <button type="submit" className="change-info-btn change-info-btn-primary">Update Info</button>
            </form>
        </div>
    );
};

export default ChangeInfo;
