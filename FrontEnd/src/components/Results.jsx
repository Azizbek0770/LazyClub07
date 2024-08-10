import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from '../features/slices/authSlice';
import '../css/userpanel.css'

const Results = () => {
    const dispatch = useDispatch();

    // Destructure results from the auth state
    const { results, testLoading, testError, testMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchResults());
    }, [dispatch]);

    if (testLoading) {
        return <div>Loading...</div>;
    }

    if (testError) {
        return <div>Error: {testMessage}</div>;
    }

    if (!results || results.length === 0) {
        return <div>No results found.</div>;
    }

    return (
        <div className='body5'>
            <h2>Your Test Results</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default Results;
