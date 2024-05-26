import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BiUser } from 'react-icons/bi';
import { login, resetState } from './auth/authSlice'; // Corrected import
import Spinner from '../components/Spinner';
import '../css/login/login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message);
    //     }

    //     if (isSuccess || user) {
    //         navigate('/');
    //     }

    //     dispatch(resetState()); // Corrected usage
    // }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    return (
        <>
        <div className='body1'>
            <div className="login-container">
                <h1 className="login-title">Login <BiUser /></h1>
                {isLoading && <Spinner />}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
            </div>
        </>
    );
};

export default LoginPage;
