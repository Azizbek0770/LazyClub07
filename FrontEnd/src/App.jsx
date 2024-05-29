import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Change import statement to use Router instead of Routes
import Navigation from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import Register from './components/register';
import Login from './components/login';
import ResetPass from './components/resetpass';
import ResetPasswordConfirm from './components/resetpasscon';
import UserActivate from './components/activation';
import UserPanel from './components/userpanel';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Spinner from './components/Spinner';
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
 
    setTimeout(() => {
      setLandingPageData(JsonData);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header data={landingPageData.Header} />} />
        <Route path="/features" element={<Features data={landingPageData.Features} />} />
        <Route path="/about" element={<About data={landingPageData.About} />} />
        <Route path="/gallery" element={<Gallery data={landingPageData.Gallery} />} />
        <Route path="/testimonials" element={<Testimonials data={landingPageData.Testimonials} />} />
        <Route path="/team" element={<Team data={landingPageData.Team} />} />
        <Route path="/contact" element={<Contact data={landingPageData.Contact} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="/activate/:uid/:token" element={<UserActivate />} />
        <Route path="/user-panel" element={<UserPanel />} />
      </Routes>
    </div>
  );
};

export default App;
