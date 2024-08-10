import React from 'react';
import { useNotifications } from './Notification';

const SomeComponent = () => {
  const { addNotification } = useNotifications();

  const handleClick = () => {
    addNotification('This is a message', 'success');
  };

  return (
    <div>
      <button onClick={handleClick}>Show Notification</button>
    </div>
  );
};

export default SomeComponent;
