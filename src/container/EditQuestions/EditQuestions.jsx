import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import edit from '../../Assets/icons8-edit (1).svg';
import del from '../../Assets/icons8-delete (1).svg';
import './editQuestions.css';

function EditQuestions() {
    const navigator = useNavigate();
    const location = useLocation();
    const [parentTest, setParentTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const testid = location.state.testid;

    useEffect(() => {
        fetchTestData(); 
    }, []);

    const fetchTestData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/allQuestion/${testid}`);
            const data = await response.json();
            
            setParentTest(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching test data:', error);
            setLoading(false);
        }
    };

    const handleEdit = (test) => {
        navigator("/edit_ques_form", { state: { ques: test } });
    };

    const handleSubmit = () => {
        navigator("/admin");
    };

    const handleDelete = (question) => {
        const id = question.testId;
        const updateUrl = `http://localhost:8080/updateAssessment/${id}`;
        const deleteUrl = `http://localhost:8080/deleteQuestion/${question.qid}`;
      
        // Show confirmation popup
        const isConfirmed = window.confirm("Are you sure you want to delete this question?");
        
        if (isConfirmed) {
            Promise.all([
                fetch(updateUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
                fetch(deleteUrl, {
                    method: "DELETE",
                })
            ])
            .then(([updateResponse, deleteResponse]) => {
                if (!updateResponse.ok) {
                    throw new Error("Network response for update was not ok");
                }
                if (!deleteResponse.ok) {
                    throw new Error("Network response for delete was not ok");
                }
                const updatedParentTest = parentTest.filter(question => question.id !== id);
                setParentTest(updatedParentTest);
                console.log("Both update and delete were successful");
                fetchTestData();
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
        }
    };

    const renderQuestions = () => {
        if (parentTest ) {
            return parentTest.map((question, index) => (
                <div className='editQuestion' key={index}>
                    <h3>Question {index + 1}</h3>
                    <div className='buttonContainer'>
                        <button type='button' className='editBtn' onClick={() =>handleEdit(question)}><img src={edit}/></button>
                        <button type='button' className='editBtn deleteBtn' onClick={() =>handleDelete(question)}><img src={del}/></button>
                    </div>
                </div>
            ));
        }
        return null;
    };

    return (
        <div className='editQuestions'>
            <div className='editContainer'>
                <div className='editSection'>
                    <div className='editInner'>
                        <div className='editHeading'>
                            <h1>{parentTest ? parentTest.tag : 'Edit Question'}</h1>
                        </div>
                        <div className='allQuestions'>
                            <h2>Questions</h2>
                            {loading ? <p>Loading...</p> : renderQuestions()}
                        </div>
                        <div className='attemptSubmit'>
                            <button type='submit' className='attemptSub' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditQuestions;
