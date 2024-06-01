import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { activateAccount } from './auth/authSlice';
import '../css/activate.css';

const ActivateAccountForm = () => {
    const dispatch = useDispatch();
    const { activatingAccount, activationError, isSuccess } = useSelector((state) => state.auth);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    useEffect(() => {
        if (uid && token && !isSuccess) {
            dispatch(activateAccount({ uid, token }));
        } else {
            console.error("UID or token is null");
        }
    }, [dispatch, uid, token, isSuccess]);

    const handleActivation = () => {
        if (uid && token) {
            dispatch(activateAccount({ uid, token }));
        }
    };

    if (isSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='activate-body'>
            <div className="activate-container">
                <button 
                    onClick={handleActivation}
                    disabled={activatingAccount} 
                    className="activate-button"
                >
                    {activatingAccount ? 'Activating...' : 'Activate Account'}
                </button>
                {activationError && <p className="error-message">{activationError}</p>}
            </div>
        </div>
    );
};

export default ActivateAccountForm;
