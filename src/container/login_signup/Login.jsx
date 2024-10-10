import React, { useState } from 'react';
import './login.css';
import './signup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const navigator = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit() {
        const student = { phone, password };
        axios.post("http://localhost:8080/studentLogin", student)
            .then((response) => {
                const res = response.data;
                if (res === false) {
                    setErrorMessage("Wrong phone number or password");
                } else {
                    navigator("/", { state: { phone: student.phone } });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <div className='login'>
            <div className='wrapper'>
                <div className='right'>
                    <h1 className='login_title'>User Login</h1>
                    <input type='text' className="input_login" placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
                    <input type='password' className="input_login" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className='submit_button color-blue' onClick={handleSubmit}>Login</button>
                    <p> Don't have an account?{' '}
                        <Link to="/signup" className="signup-link">
                            Signup here!
                        </Link>
                    </p>
                    <p> Are you an Admin?{' '}
                        <Link to="/login_admin" className="signup-link">
                            Login here!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
