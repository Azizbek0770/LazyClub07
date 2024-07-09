import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../css/dropdown.css';

const CustomDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="custom-dropdown-container">
      <button className="custom-dropdown-btn" onClick={toggleDropdown}>
        MORE
      </button>
      <div className={`custom-dropdown-content ${showDropdown ? "show" : ""}`}>
        <Link to="#">Course 1</Link>
        <Link to="#">Course 2</Link>
        <Link to="#">Course 3</Link>
        <Link to="/lessons">List</Link>
      </div>
    </div>
  );
};

export default CustomDropdown;
