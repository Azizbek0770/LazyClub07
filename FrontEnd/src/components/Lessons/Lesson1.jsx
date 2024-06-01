import React from 'react';
import './Lessons.css';

const LessonPage = () => {
  const keyPoints = [
    "Understand the basics of JSX",
    "Learn how to create React components",
    "Know how to pass props to components",
    "Understand state management in React"
  ];

  return (
    <div className="container">
      <h1 className="title">React Lesson: Introduction to JSX</h1>
      <p className="description">
        JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It is used with React to describe what the UI should look like. In this lesson, we will cover the basics of JSX and how it integrates with React components.
      </p>
      <h2 className="subTitle">Key Points:</h2>
      <ul className="list">
        {keyPoints.map((point, index) => (
          <li key={index} className="listItem">{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonPage;
