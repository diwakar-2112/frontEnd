import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigator = useNavigate();
  const [firstName, setUserName] = useState("");
  const [phone, setPhone] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePhone = (phone) => {
    // Regular expression for validating phone number format (10 digits)
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const validatePassword = (password) => {
    // Regular expression for validating password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleForm = (event) => {
    event.preventDefault();
    
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    const person = { firstName, password, phone }; 
    axios.post("http://localhost:8080/createStudent", person)
      .then((response) => {
        console.log(response.data);
        navigator("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  
  const handleChange1 = (e) => {
    setPhone(e.target.value); 
  };
  
  const handleChange2 = (e) => {
    setPassword(e.target.value);
  };
  
  const handleChange3 = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className='SignUp'>
      <div className='wrapper_signup'>
        <div className='right_signup'>
          <h1 className='signup_title'>Signup</h1>
          <form onSubmit={handleForm}>
            <label>
              <input type='text' className="input_signup" placeholder='name' name='username' onChange={handleChange} value={firstName} />
            </label>
            <label>
              <input type='text' className="input_signup" placeholder='phone' name='phone' onChange={handleChange1} value={phone} />
            </label>
            <label>
              <input type='password' className="input_signup" placeholder='password' name='password' onChange={handleChange2} value={password} />
            </label>
            <label>
              <input type='password' className="input_signup" placeholder='confirm password' name='confirmPassword' onChange={handleChange3} value={confirmPassword} />
            </label>
            <p className='er'>{error}</p>
            <input className='submit_btn' type="submit" value="Sign Up" />
          </form>
          <p className='been_here'>Been Here Before?{' '}
            <Link to="/login" className="login-link">
              Log in here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
