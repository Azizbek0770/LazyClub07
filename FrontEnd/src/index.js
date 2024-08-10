import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Adjust path as per your project structure
import store from './redux/store'; // Adjust path as per your project structure
import { Provider } from 'react-redux';
import { NotificationProvider } from './contexts/notificationcontext'; // Import the NotificationProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Router>
  </Provider>
);
