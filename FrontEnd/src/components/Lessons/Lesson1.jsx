import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchLessonByIdThunk } from '../auth/authSlice';
import LoadingSpinner from '../Spinner'; // Ensure this component exists
import ErrorAlert from './errors/ErrorAlert'; // Ensure this component exists
import './Lessons.css'; // Ensure the CSS file exists

const Lesson = () => {
    const { lessonId } = useParams();
    const dispatch = useDispatch();
    const { lesson, lessonLoading: loading, lessonError: error } = useSelector(state => state.auth);

    useEffect(() => {
        if (lessonId) {
            dispatch(fetchLessonByIdThunk(lessonId));
        }
    }, [dispatch, lessonId]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;
    if (!lesson) return <div>No lesson found</div>;

    return (
        <div id='Body1'>
            <div className="lesson-container">
                <h1 className="lesson-title">{lesson.title}</h1>
                <hr className='underline'></hr>
                <img className="lesson-image" src={lesson.photo} alt={lesson.title} />
                <p className="lesson-text">{lesson.information}</p>
                <form>
                    <label>
                        <input type="radio" name="completed" /> Lesson Completed
                    </label>
                </form>
                <div>
                </div>

                <div className="Cont2">
                {lesson.test_questions?.map((question, index) => (
                    <div key={index}>
                        <p>{question.question}</p>
                        {question.choices.map((choice, idx) => (
                            <label key={idx}>
                                <input type="radio" name={`question${index}`} value={choice} />
                                {choice}
                            </label>
                        ))}
                    </div>
                ))}
                </div>

            </div>
        </div>
    );
};

export default Lesson;
