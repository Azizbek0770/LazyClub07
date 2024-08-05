import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, UpdateUserInfo } from './auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../css/userpanel.css';

const ChangeInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoading, isError, message } = useSelector((state) => state.auth);
    
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
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
            navigate('/user-panel'); // Redirect to user panel after updating info
        });
    };

    if (!userInfo) {
        return null; // Prevent rendering if no user info is available
    }

    return (
        <div className="body5">
            <div className="user-panel-container">
                <h2 className="form-name">Change User Info</h2>
                <hr className="divider" />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            value={first_name} 
                            onChange={(e) => setFirstName(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input 
                            type="text" 
                            value={last_name} 
                            onChange={(e) => setLastName(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <input 
                            type="text" 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)} 
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>Update Info</button>
                </form>
                {isLoading && <p>Updating...</p>}
                {isError && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ChangeInfo;
