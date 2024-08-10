import React, { createContext, useContext } from 'react';
import { useNotifications } from '../components/Notification'; // Adjust the path as needed
import { NotificationContainer } from '../components/Notification'; // Adjust the path as needed

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { notifications, addNotification, removeNotification } = useNotifications();

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => useContext(NotificationContext);
