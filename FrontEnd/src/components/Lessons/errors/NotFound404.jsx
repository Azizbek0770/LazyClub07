import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.css'; // Optional: for styling the NotFound page

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
