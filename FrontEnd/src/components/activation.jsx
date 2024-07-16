import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { activateAccount } from './auth/authSlice';
import Spinner from './Spinner'; // Ensure you have this Spinner component
import '../css/activate.css';

const ActivateAccountForm = () => {
    const dispatch = useDispatch();
    const { activatingAccount, activationError, isSuccess } = useSelector((state) => state.auth);
    const { uid, token } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (isSuccess) {
            navigate('/checkout');
        }
    }, [isSuccess, navigate]);

    return (
        <div className='body6'>
            {activatingAccount && <Spinner />} {/* Display spinner while activating */}
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
