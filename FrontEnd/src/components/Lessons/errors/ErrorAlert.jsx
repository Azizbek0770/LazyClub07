// components/ErrorAlert.jsx
import React from 'react';
import './ErrorAlert.css'; // Create a CSS file for error alert styling

const ErrorAlert = ({ message }) => (
    <div className="error-alert">
        <p>{message}</p>
    </div>
);

export default ErrorAlert;
