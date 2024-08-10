import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests, submitTest } from '../features/slices/authSlice';
import '../css/Test.css'; // Import the CSS file

const Test = () => {
    const dispatch = useDispatch();
    const { tests = [], testLoading, testError, testMessage } = useSelector((state) => state.auth);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    useEffect(() => {
        console.log('Tests state:', tests); // Log the tests state
    }, [tests]);

    const handleChange = (e, questionId) => {
        setAnswers({
            ...answers,
            [questionId]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitTest(answers));
    };

    return (
        <div className='body8'>
            <div className="test-container">
                <h1>Take a Test</h1>
                {testLoading && <p>Loading...</p>}
                {testError && <p className="error">Error: {testError}</p>}
                {testMessage && <p className="success">{testMessage}</p>}
                <form onSubmit={handleSubmit}>
                    {Array.isArray(tests) && tests.length > 0 ? (
                        tests.map((test) => (
                            <div key={test.id} className="test-question">
                                <h3>{test.question}</h3>
                                {test.options.map((option) => (
                                    <label key={option.id}>
                                        <input
                                            type="radio"
                                            name={test.id}
                                            value={option.id}
                                            onChange={(e) => handleChange(e, test.id)}
                                        />
                                        {option.text}
                                    </label>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No tests available</p>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Test;
