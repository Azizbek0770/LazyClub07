// useractivate.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { activateAccount } from './auth/authSlice';
import Spinner from './Spinner';

const UserActivate = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isError, message, isSuccess } = useSelector((state) => state.auth);

    const handleActivation = () => {
        dispatch(activateAccount({ uid, token }));
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    return (
        <div>
            {isLoading && <Spinner />}
            {isError && <p>Error: {message}</p>}
            <button onClick={handleActivation}>Activate Account</button>
        </div>
    );
};

export default UserActivate;
