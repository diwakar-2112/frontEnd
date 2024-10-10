import React, { useState, useEffect } from 'react';
import './result.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import trophe from '../../Assets/trophe.png';

function Result() {
    const navigator = useNavigate();
    const location = useLocation();
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState('');
    const marksPerQuestion = 2; // Marks per question

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch(`http://localhost:8080/getQuestions/${location.state.testid}`)
            .then((response) => response.json())
            .then((data) => {
                setTotalQuestions(data);
                
                // Calculate marks obtained and total marks
                const marksObtained = location.state.correct * marksPerQuestion;
                const totalMarks = data * marksPerQuestion;
                
                // Calculate percentage
                const percentage = (marksObtained / totalMarks) * 100;
                
                setScore(percentage);
                setResult(percentage >= 33 ? 'Pass' : 'Fail');
            })
            .catch((error) => {
                console.error("There was a problem fetching the data:", error);
            });
    }

    function logout() {
        fetch("http://localhost:8080/logout");
        navigator("/");
    }

    return (
        <div className='Result'>
            <div className='Result_section'>
                <img src={trophe} alt='trophe' className='win'></img>
                <div className='Result_container'>
                    <h1 className="result_heading">Result</h1>
                    <div className="result_circle">
                        {/* Display marks obtained out of total marks */}
                        <p className="result_text">
                            {(location.state.correct * marksPerQuestion)}/{(totalQuestions * marksPerQuestion)}
                        </p>
                    </div>
                    <div className="result_summary">
                        <div className={`result_percentage ${result === 'Pass' ? 'pass' : 'fail'}`}>
                            Percentage: {score.toFixed(2) + "%"}
                        </div>
                        <p className="result_text">Status: {result}</p>
                    </div>
                    <div className="result_links">
                        <Link to="/assessments" className="result_link">
                            Back to Assessment
                        </Link>
                        <button className="result_link" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;
