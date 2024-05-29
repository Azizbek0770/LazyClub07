import React from "react";
import '../css/header.css'

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
   
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 className="text1">Welcome to <span className="Lazyl">LazyClub</span></h1>

                <a
                  href="/features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
