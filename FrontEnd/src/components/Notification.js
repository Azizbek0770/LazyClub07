import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Slide } from '@mui/material';
import '../css/notify.css';

const Notification = ({ message, severity, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Alert severity={severity} onClose={onClose}>
                <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
                {message}
            </Alert>
        </Slide>
    );
};

const NotificationContainer = ({ notifications, removeNotification }) => {
    return (
        <div className="notification-container">
            {notifications.map((notification, index) => (
                <Notification
                    key={index}
                    message={notification.message}
                    severity={notification.severity}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );
};

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, severity) => {
        const id = new Date().getTime();
        setNotifications([...notifications, { id, message, severity }]);
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return { notifications, addNotification, removeNotification };
};

export { NotificationContainer, useNotifications };
