import React, { useState } from 'react';
import './ques.css';
import doodle from '../../Assets/q.jpg';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Ques_form() {
    const navigator = useNavigate();

    const location = useLocation();
    const testId = location.state.test.id;
    console.log(location.state.test);

    const [text, setText] = useState("");
    const [op1, setOp1] = useState("");
    const [op2, setOp2] = useState("");
    const [op3, setOp3] = useState("");
    const [op4, setOp4] = useState("");
    const [correct, setCorrect] = useState("");

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const question = {text,op1,op2,op3,op4,correct,testId}
        axios.post("http://localhost:8080/createQuestion",question).then((response) => {
            console.log(response.data);
        })
        navigator("/edit_ques", { state: { test: location.state.test } });
    };

    return (
        <div className="Ques_form">
            {/* <img src={doodle} alt='img' className='doodle_img'/> */}
            <div className="ques_section">
                <div className="q_formbg-outer">
                    <div className="q_formbg">
                        <div className="q_formbg-inner">
                            <form onSubmit={handleSubmit} id="q_stripe-login">
                                <div className="q_form_head">
                                    <h1>Add Question</h1>
                                </div>
                                <div className="q_field">
                                    <label htmlFor="text" className='q_label'>Ques text</label>
                                    <textarea
                                        type="textarea"
                                        name="textarea"
                                        rows={6}
                                        cols={60}
                                        className='text_area'
                                        value={text}
                                        onChange={(e) => handleInputChange(e, setText)}
                                    />
                                </div>
                                <div className='all_options'>
                                    <div className="q_field">
                                        <div className="grid">
                                            <label htmlFor="op1" className='q_label'>Option 1</label>
                                            <textarea
                                                type="textarea"
                                                name="textarea"
                                                className='text_area'
                                                value={op1}
                                                onChange={(e) => handleInputChange(e, setOp1)}
                                            />
                                        </div>
                                        <div className="grid">
                                            <label htmlFor="op2" className='q_label'>Option 2</label>
                                            <textarea
                                                type="textarea"
                                                name="textarea"
                                                className='text_area'
                                                value={op2}
                                                onChange={(e) => handleInputChange(e, setOp2)}
                                            />
                                        </div>
                                    </div>
                                    <div className="q_field">
                                        <div className="grid">
                                            <label htmlFor="op3" className='q_label'>Option 3</label>
                                            <textarea
                                                type="textarea"
                                                name="textarea"
                                                className='text_area'
                                                value={op3}
                                                onChange={(e) => handleInputChange(e, setOp3)}
                                            />
                                        </div>
                                        <div className="grid">
                                            <label htmlFor="op4" className='q_label'>Option 4</label>
                                            <textarea
                                                type="textarea"
                                                name="textarea"
                                                className='text_area'
                                                value={op4}
                                                onChange={(e) => handleInputChange(e, setOp4)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="q_field">
                                    <div className="grid">
                                        <label htmlFor="correct" className='q_label'>Correct Option</label>
                                        <textarea
                                            type="textarea"
                                            name="textarea"
                                            rows={3}
                                            cols={60}
                                            value={correct}
                                            onChange={(e) => handleInputChange(e, setCorrect)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="q_field">
                                <input type="submit"  value="Submit" />
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ques_form;