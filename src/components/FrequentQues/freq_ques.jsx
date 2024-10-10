import React, { useState } from 'react';
import './freq_ques.css';



const QuestionItem = ({ question, answer, isOpen, onToggle }) => {
    return (
      <div className="question-item">
        <div className="question-header" onClick={onToggle}>
          <div className="question-text">{question}</div>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && <div className="question-content">{answer}</div>}
      </div>
    );
  };
  
  const QuestionAccordion = ({ faqData }) => {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="question-accordion">
        {faqData.map((item, index) => (
          <QuestionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => toggleAccordion(index)}
          />
        ))}
      </div>
    );
  };
  
  const App = () => {
    const faqData = [
      {
        question: "How do I sign up for an account?",
        answer: "To sign up for an account, click on the 'Sign Up' button on the top right corner of the home page. Fill out the required information, including your name, mobile number, and password. It will activate your account on-the-spot. "
      },
      {
        question: "What type of assessments are available on the platform?",
        answer: "We offer a wide range of assessments covering various subjects including programming languages, frameworks and concepts. Whether you are a beginner looking to test your basic skills or an experienced person aiming to advance your expertise, we have assessments tailored to meet your needs. Explore our catalog to find assessments in different areas such as technical, programming and more."
      },
      {
        question: "How do I know if I passed the exam?",
        answer: "Results will be available on your account dashboard right after you have completed the exam."
      }
    ];
  
    return (
      <div>
        <h1 style={{ paddingTop: '70px' }}>Frequently Asked Questions</h1>
        <QuestionAccordion faqData={faqData} />
      </div>
    );
  };
  
  export default App;
