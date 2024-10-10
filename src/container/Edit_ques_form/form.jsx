import React, { useState } from "react";
import "../Ques_form/ques.css";
import doodle from "../../Assets/q.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Form_edit() {
  const navigator = useNavigate();

  const location = useLocation();
  const ques = location.state.ques;
  console.log(location.state.ques);

  const [text, setText] = useState(ques.text);
  const [op1, setOp1] = useState(ques.op1);
  const [op2, setOp2] = useState(ques.op2);
  const [op3, setOp3] = useState(ques.op3);
  const [op4, setOp4] = useState(ques.op4);
  const [correct, setCorrect] = useState(ques.correct);
  const testId = ques.testId;
  const qid = ques.qid;

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = { qid, text, op1, op2, op3, op4, correct, testId };
    fetch(`http://localhost:8080/updateQuestion`, {
      method: "PUT",
      body: JSON.stringify(question), // Convert object to JSON string
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response JSON if expecting any
      })
      .then((data) => {
        console.log("Update successful", data);
        navigator("/editquestions", { state: { testid:testId } });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
};


  return (
    <div className="Ques_form">
      <div className="ques_section">
        <div className="q_formbg-outer">
          <div className="q_formbg">
            <div className="q_formbg-inner">
              <form onSubmit={handleSubmit} id="q_stripe-login">
                <div className="q_form_head">
                  <h1>Edit Question</h1>
                </div>
                <div className="q_field ">
                  <label htmlFor="text">Ques text</label>
                  <textarea
                    type="textarea"
                    name="textarea"
                    rows={6}
                    cols={60}
                    className="text_area"
                    value={text}
                    onChange={(e) => handleInputChange(e, setText)}
                  />
                </div>
                <div className="all_options">
                  <div className="q_field">
                    <div className="grid">
                      <label htmlFor="op1">Option 1</label>
                      <textarea
                        type="textarea"
                        name="textarea"
                        className="text_area"
                        value={op1}
                        onChange={(e) => handleInputChange(e, setOp1)}
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="op2">Option 2</label>
                      <textarea
                        type="textarea"
                        name="textarea"
                        className="text_area"
                        value={op2}
                        onChange={(e) => handleInputChange(e, setOp2)}
                      />
                    </div>
                  </div>
                  <div className="q_field">
                    <div className="grid">
                      <label htmlFor="op3">Option 3</label>
                      <textarea
                        type="textarea"
                        name="textarea"
                        className="text_area"
                        value={op3}
                        onChange={(e) => handleInputChange(e, setOp3)}
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="op4">Option 4</label>
                      <textarea
                        type="textarea"
                        name="textarea"
                        className="text_area"
                        value={op4}
                        onChange={(e) => handleInputChange(e, setOp4)}
                      />
                    </div>
                  </div>
                </div>
                <div className="q_field">
                  <div className="grid">
                    <label htmlFor="correct">Correct Option</label>
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

export default Form_edit;
