import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { activateAccount } from './auth/authSlice';

const ActivateAccountForm = () => {
    const dispatch = useDispatch();
    const [activationCode, setActivationCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(activateAccount({ activationCode }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Activation Code" value={activationCode} onChange={(e) => setActivationCode(e.target.value)} />
            <button type="submit">Activate Account</button>
        </form>
    );
};

export default ActivateAccountForm;
