import React, { useEffect, useState } from 'react';
import './attempt.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import FullScreenPopup from './FulllScreenPopup';
import WebcamCapture from './WebcamCapture';

function Attempt() {
  const navigator = useNavigate();
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const location = useLocation();
  const testid = location.state.testid;
  const [timer, setTimer] = useState();
  const [isFullScreenPopupOpen, setIsFullScreenPopupOpen] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(`http://localhost:8080/allQuestion/${testid}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const totalQuestions = data.length;
        const totalTime = totalQuestions * 2 * 60 * 1000;
        setTimer(totalTime);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
  }

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(prevTime => prevTime - 1000);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else if (timer === 0) {
      handleSubmit(); // Auto-submit when timer expires
    }
  }, [timer]);

  useEffect(() => {
    // Auto-submit test when timer expires
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleOptionChange = (qid, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [qid]: option
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleResetAnswers = () => {
    setSelectedOptions({});
  };

  const handleSubmit = async () => {
    let updatedScore = 0;
    const selectedOptionsArray = Object.entries(selectedOptions);
    const fetchPromises = selectedOptionsArray.map(([qid, selectedOption]) => {
      return fetch("http://localhost:8080/checkQuestion/" + qid)
        .then((response) => response.json())
        .then((data) => {
          const correct = data.correct;
          if (correct === selectedOption) {
            updatedScore += 1;
          }
        })
        .catch((error) => {
          console.error("There was a problem fetching the data:", error);
        });
    });
    await Promise.all(fetchPromises);
    console.log("Final score:", updatedScore);
    setIsFullScreenPopupOpen(false); // Close the full-screen popup
    fetch(`http://localhost:8080/incrementCount/${testid}`);
    navigator("/result", { state: { testid: testid, correct: updatedScore } });
  };

  const handleCloseFullScreenPopup = () => {
    setIsFullScreenPopupOpen(false);
  };

  const handleCaptureImage = (image) => {
    setCapturedImage(image);
  };

  return (
    <div className='Attempt'>
      <WebcamCapture className='video' onCapture={handleCaptureImage} />
      <Sidebar data={data} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
      {isFullScreenPopupOpen && (
        <FullScreenPopup onClose={handleCloseFullScreenPopup} />
      )}
      {!isFullScreenPopupOpen && (
        <div className='Attempt_container'>
          <div className='timer'>
            <span className="timer-value">{Math.floor(timer / (60 * 1000))} min : {((timer % (60 * 1000)) / 1000).toFixed(0)} sec</span>
          </div>
          <div className='Attempt_section'>
            <div className='Attempt_inner'>
              
              {data.length === 0 ? (
                <p>Loading....</p>
              ) : (
                <div className='question'>
                  <div className='Attempt_ques'>
                    <h3>Q {currentQuestion + 1}. {data[currentQuestion].text}</h3>
                  </div>
                  <div className='options'>
                    <label className='option'>
                      <input
                        type='radio'
                        name={`option_${data[currentQuestion].qid}`}
                        value={data[currentQuestion].op1}
                        checked={selectedOptions[data[currentQuestion].qid] === data[currentQuestion].op1}
                        onChange={() => handleOptionChange(data[currentQuestion].qid, data[currentQuestion].op1)}
                      />
                      {data[currentQuestion].op1}
                    </label>
                    <label className='option'>
                      <input
                        type='radio'
                        name={`option_${data[currentQuestion].qid}`}
                        value={data[currentQuestion].op2}
                        checked={selectedOptions[data[currentQuestion].qid] === data[currentQuestion].op2}
                        onChange={() => handleOptionChange(data[currentQuestion].qid, data[currentQuestion].op2)}
                      />
                      {data[currentQuestion].op2}
                    </label>
                    <label className='option'>
                      <input
                        type='radio'
                        name={`option_${data[currentQuestion].qid}`}
                        value={data[currentQuestion].op3}
                        checked={selectedOptions[data[currentQuestion].qid] === data[currentQuestion].op3}
                        onChange={() => handleOptionChange(data[currentQuestion].qid, data[currentQuestion].op3)}
                      />
                      {data[currentQuestion].op3}
                    </label>
                    <label className='option'>
                      <input
                        type='radio'
                        name={`option_${data[currentQuestion].qid}`}
                        value={data[currentQuestion].op4}
                        checked={selectedOptions[data[currentQuestion].qid] === data[currentQuestion].op4}
                        onChange={() => handleOptionChange(data[currentQuestion].qid, data[currentQuestion].op4)}
                      />
                      {data[currentQuestion].op4}
                    </label>
                    <div className='attempt_controls'>
                      <button onClick={handleResetAnswers}>Reset Answers</button>
                      <div class="checkbox-wrapper-31">
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className='attempt_nav_'>
                <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button>
                <button onClick={handleNextQuestion} disabled={currentQuestion === data.length - 1}>Next</button>
                {currentQuestion === data.length - 1 && (
                  <button type='submit' className='attempt_sub_' onClick={handleSubmit}>Submit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attempt;
