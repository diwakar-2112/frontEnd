import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function AdminLogin() {
    const navigator = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        const admin = { username, password };
        axios.post("http://localhost:8080/adminLogin", admin)
            .then((response) => {
                const isAdmin = response.data;
                if (isAdmin) {
                    navigator("/admin");
                } else {
                    console.log("Invalid admin credentials");
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
                    <h1 className='login_title'>Admin Login</h1>
                    <input
                        type='text'
                        className="input_login"
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        className="input_login"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='submit_button color-blue' onClick={handleSubmit}>Login</button>
                    <p>Not an admin?{' '}
                        <Link to="/login" className="signup-link">
                            Go back to User Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
