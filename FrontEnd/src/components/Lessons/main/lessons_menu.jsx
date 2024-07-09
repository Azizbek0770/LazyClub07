import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import './Lessonlist.css';

const LessonsList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (lessonId) => {
    setLoading(true);
    // Simulating loading time
    setTimeout(() => {
      setLoading(false);
      // Navigate to the lesson with the given ID
      navigate(`/lesson/${lessonId}`);
    }, 1000);
  };

  return (
    <div className='body12'>
      {loading && <Spinner />}
      <div className="lessons-list">
        <h2>Themes:</h2>
        <ul>
          <li className='beta-link-container'>
            <span>FaceBook</span>
            <Link to={`/lesson/1`} onClick={() => handleClick(1)}>Start</Link>
          </li>
          <li className="beta-link-container">
            <span>Meta</span>
            <Link to={`/lesson/2`} onClick={() => handleClick(2)}>Start</Link>
          </li>
          <li className="beta-link-container">
            <span>Beta</span>
            <Link to={`/lesson/3`} onClick={() => handleClick(3)}>Start</Link>
          </li>
          <li className="beta-link-container">
            <span>Beta</span>
            <Link to={`/lesson/4`} onClick={() => handleClick(4)}>Start</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LessonsList;
