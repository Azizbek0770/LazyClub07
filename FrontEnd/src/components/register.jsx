import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BiUser } from 'react-icons/bi';
import { register, resetState } from './auth/authSlice';
import Spinner from '../components/Spinner';
import '../css/register.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
        gender: '',
        username: '',
    });

    const { first_name, last_name, email, password, re_password, gender, username } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
            toast.success('An activation email has been sent to your email. Please check your email.');
        }

        dispatch(resetState());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
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
                email,
                password,
                re_password,
                gender,
                username,
            };
            dispatch(register(userData));
        }
    };

    return (
        <>
        <div className='body'>
            <div className="register-container">
                <h1 className="register-title">Register <BiUser /></h1>
                {isLoading && <Spinner />}
                <form className="register-form" onSubmit={handleSubmit}>
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
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
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
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                        required
                    />
                    <select
                        name="gender"
                        value={gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button className="btn btn-primary" type="submit">Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
            </div>
        </>
    );
};

export default RegisterPage;
