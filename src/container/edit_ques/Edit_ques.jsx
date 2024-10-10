import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './edit_ques.css';
import edit from '../../Assets/icons8-edit (1).svg';

function Edit_ques() {
    const navigator = useNavigate();
    const location = useLocation();
    const parentTest = location.state.test;

    const count = parentTest.questions;
    const questionArray = [];

    function handleEdit() {
        navigator("/ques_from", { state: { test: parentTest } });
    }

    function handleSubmit() {
        navigator("/admin");
    }

    for (let i = 1; i < count + 1; i++) {
        questionArray.push(
            <div className='questionContainer' key={i}>
                <h3>Question {i} </h3>
                <button type='button' className='editButton' onClick={handleEdit}><img src={edit}/></button>
            </div>
        );
    }

    return (
        <div className='editQuesContainer'>
            <div className='editContainer'>
                <div className='editSection'>
                    <div className='editInner'>
                        <div className='editHeading_'>
                            <h1>{parentTest.tag}</h1>
                        </div>
                            <div className='allQuestions'>
                                {questionArray}
                            </div>
                            <div className='attemptSubmit'>
                                <button type='submit' className='submitButton_' onClick={handleSubmit}>Submit</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit_ques;
