import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetPassword } from './auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import '../css/register.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    re_password: '',
  });

  const { first_name, last_name, username, email, gender, password, re_password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        first_name,
        last_name,
        username,
        email,
        gender,
        password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
      toast.success('An activation email has been sent to your email. Please check your email');
    }

    dispatch(resetPassword());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (

    <div className='body'>

    <div className="register-container">
      {isLoading && <Spinner />}

      <form className="register-form" onSubmit={handleSubmit}>
      <h1 className="register-title">
      Register <BiUser />
    </h1>
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          onChange={handleChange}
          value={first_name}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          onChange={handleChange}
          value={last_name}
          required
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={username}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <select name="gender" onChange={handleChange} value={gender} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <input
          type="password"
          placeholder="Retype Password"
          name="re_password"
          onChange={handleChange}
          value={re_password}
          required
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
