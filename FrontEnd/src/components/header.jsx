// src/components/header.jsx
import React, { useEffect, useState } from "react";
import '../css/header.css';

export const Header = (props) => {
  const [text, setText] = useState("Welcome to LazyClub");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const typingDuration = 3000; 
    const deletingDuration = 2500; // 2 seconds
    const delayBetweenTexts = 1050; // 1 second

    if (typing) {
      const timer = setTimeout(() => {
        setTyping(false);
      }, typingDuration + delayBetweenTexts);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setText("Our first project is working now, enjoy it!");
        setTyping(true);
      }, deletingDuration);
      return () => clearTimeout(timer);
    }
  }, [typing]);

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 className={`text1 ${typing ? 'typing' : 'deleting'}`}>
                  {text.includes('LazyClub') ? (
                    <>
                      Welcome to <span className="Lazyl">LazyClub</span>
                    </>
                  ) : (
                    text
                  )}
                </h1>
                <a
                  href="/features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
