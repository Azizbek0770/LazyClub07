import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
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
import ActivateAccountForm from './components/activation';
import UserPanel from './components/userpanel';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Spinner from './components/Spinner';
import Warning from './components/warning';
import Lesson from './components/Lessons/Lesson1';
import LessonsList from './components/Lessons/main/lessons_menu';
import NotFound from './components/Lessons/errors/NotFound404';
import Results from './components/Results';
import ChangeInfo from './components/changeuserinfo';
import { NotificationContainer, useNotifications } from './components/Notification';
import SomeComponent from "./components/somecomponent";
import Tests from './components/Test'; // Import Tests component
import Result from "./components/Results";
import "./App.css";

// Initialize SmoothScroll
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 501,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // Simulating data loading from JSON
      setLandingPageData(JsonData);
      setLoading(false);
    }, 2001); // Simulating a 2-second delay
  }, []);

  const { notifications, addNotification, removeNotification } = useNotifications();

  if (loading) {
    return <Spinner />; // Show spinner while loading data
  }

  const accessToken = localStorage.getItem('access_token');
  const uid = localStorage.getItem('uid'); // Assuming you have the UID stored similarly

  return (
    <div>
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
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
        <Route path="/auth/activate/:uid/:token" element={<ActivateAccountForm />} />
        <Route path="/user-panel" element={<UserPanel accessToken={accessToken} uid={uid} />} />
        <Route path="/results" element={<Results />} />
        <Route path="/changeinfo" element={<ChangeInfo />} />
        <Route path="/checkout" element={<Warning />} />
        <Route path="/lesson/:lessonId" element={<Lesson />} />
        <Route path="/lessons" element={<LessonsList />} />
        <Route path="/some-component" element={<SomeComponent />} />
        <Route path="/tests" element={<Tests />} /> {/* Add route for Tests component */}
        <Route path="/results/:testId" element={<Result />} /> {/* Add route for Results component */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
