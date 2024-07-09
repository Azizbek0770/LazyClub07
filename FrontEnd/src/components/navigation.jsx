import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './auth/authSlice';  // Update the path as per your project structure
import Logo from '../css/logo-no-background.png';
import Dropdown from '../components/dropdown'; // Ensure this component exists and the path is correct

const Navigation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand page-scroll">
            <img className="Logo" alt="Logo" src={Logo} />
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Dropdown />
            </li>
            <li>
              <Link to="/features" className="page-scroll">
                Vazifamiz
              </Link>
            </li>
            <li>
              <Link to="/about" className="page-scroll">
                Biz Haqimizda
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="page-scroll">
                Galereya
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="page-scroll">
                Izohlar
              </Link>
            </li>
            <li>
              <Link to="/team" className="page-scroll">
                Jamoa
              </Link>
            </li>
            <li>
              <Link to="/contact" className="page-scroll">
                Kontakt
              </Link>
            </li>
            {user ? (
              <li>
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={user.profilePicture} alt="__" className="profile-icon" /> {user.name}
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/user-panel">User Panel</Link></li>
                  <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                </ul>
              </li>
            ) : (
              <li>
                <button className="btn btn-custom">
                  <Link to="/login" className="auth1">
                    Kirish
                  </Link>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
