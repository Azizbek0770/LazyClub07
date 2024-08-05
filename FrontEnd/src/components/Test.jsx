import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests, submitTest } from './auth/authSlice.js';

const Test = () => {
    const dispatch = useDispatch();
    const { tests, isLoading, isError, message } = useSelector((state) => state.test);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

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
        <div>
            <h1>Take a Test</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {message}</p>}
            <form onSubmit={handleSubmit}>
                {tests.map((test) => (
                    <div key={test.id}>
                        <p>{test.question_str}</p>
                        {test.question_img && <img src={test.question_img} alt="Question" />}
                        {['option1', 'option2', 'option3', 'option4'].map((option) => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    name={`question-${test.id}`}
                                    value={option}
                                    onChange={(e) => handleChange(e, test.id)}
                                />
                                <label>{test[option]}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Test;
