import React from 'react';
import './dashboard.css';
import { useState, useEffect } from 'react';

function Dashboard() {
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        fetchAssessmentData();
    }, []);

    const fetchAssessmentData = async () => {
        try {
            const response = await fetch('http://localhost:8080/allAssessment');
            const data = await response.json();
            setAssessments(data);
        } catch (error) {
            console.error('Error fetching assessment data:', error);
        }
    };

    return (
        <div className='dashboard'>
            <div className='dash_container'>
                <div className='user_dashboard'>
                    <div className='user_details gradient_color'>
                        <div className='user_info'>
                            <div className='user_name '>Abc defghi</div>
                        </div>
                    </div>
                    <div className='user_stats gradient_color'>
                        <div className='stat_heading'>
                            <h1>Statistics</h1>
                        </div>
                        <div className='stat_details'>
                            <p>Total assignments: 50</p>
                            <p>Completed: 20</p>
                            <p>Total Score: 400</p>
                            <p>Aggregate Percentage: 70%</p>
                        </div>
                        <div className='topic_heading'>
                            <h1>Topics Covered</h1>
                        </div>
                        <div className='topic_details'>
                            <p>C &nbsp; Cpp &nbsp; Java</p>
                            <p>HTML &nbsp; CSS &nbsp; JS &nbsp; React</p>
                        </div>
                    </div>
                </div>

                <div className='user_assignment gradient_color'>
                    <div className='assign_section'>
                        <div className='assign_heading'>
                            <h1>Assessments</h1>
                        </div>
                        <div className='assessment_container table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S. No</th>
                                        <th>Tag</th>
                                        <th>No. of Questions</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assessments.map((assessment, index) => (
                                        <tr key={index}>
                                            <td>{assessment.id}</td>
                                            <td>{assessment.tag}</td>
                                            <td>{assessment.questions}</td>
                                            <td>{assessment.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Dashboard;
