import React, { useState } from 'react';
import './test_form.css';
import doodle from '../../Assets/doodle.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Test_form() {
    const navigator = useNavigate();
    const [tag, setTag] = useState("");
    const [questions, setQues] = useState("");
    const [topic, setTopic] = useState("");
    const [marks, setMarks] = useState(""); // New state for marks
    const [Test, setTest] = useState({});

    function handleTag(e) {
        setTag(e.target.value);
    }

    function handleQues(e) {
        setQues(e.target.value);
    }

    function handleTopic(e) {
        setTopic(e.target.value);
    }

    function handleMarks(e) { // New handler for marks input
        setMarks(e.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const assessment = { tag, questions, topic, marks }; // Include marks in the assessment object

        axios.post("http://localhost:8080/createAssessment", assessment)
            .then((response) => {
                setTest(response.data);
                console.log(response.data);
                navigator("/edit_ques", { state: { test: response.data } });
            })
            .catch(error => {
                console.error("Error creating assessment:", error);
            });
    }

    return (
        <div className="Test_form">
            {/* <img src={doodle} alt='img' className='doodle_img' /> */}
            <div className="test_section">
                <div className="formbg-outer">
                    <div className="formbg">
                        <div className="formbg-inner">
                            <form id="stripe-login" onSubmit={handleSubmit}>
                                <div className="form_head">
                                    <h1>Add Assessment</h1>
                                </div>
                                <div className="field">
                                    <label htmlFor="text">Name the Assessment</label>
                                    <input type="text" name="name" onChange={handleTag} />
                                </div>
                                <div className="field">
                                    <div className="grid">
                                        <label htmlFor="number">No of questions</label>
                                    </div>
                                    <input type='number' name="ques" onChange={handleQues} />
                                </div>
                                <div className="field dropdown">
                                    <div className="grid">
                                        <label htmlFor="text">Topic</label>
                                    </div>
                                    <select name="topic" onChange={handleTopic}>
                                        <option value="">Select Topic</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Science">Science</option>
                                        <option value="Social Studies">Social Studies</option>
                                        <option value="Language Arts">Language Arts</option>
                                        <option value="Business and Finance">Business and Finance</option>
                                        <option value="Health and Wellness">Health and Wellness</option>
                                        <option value="Arts and Humanities">Arts and Humanities</option>
                                        <option value="Programming">Programming</option>
                                        <option value="Technical">Technical</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="field"> {/* New field for marks */}
                                    <div className="grid">
                                        <label htmlFor="number">Marks per Question</label>
                                    </div>
                                    <input type='number' name="marks" onChange={handleMarks} />
                                </div>
                                <div className="field">
                                    <input type="submit" name="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test_form;
