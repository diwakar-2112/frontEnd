import React from 'react';
import { Link } from 'react-router-dom';
import './error.css'; 
import error from '../../Assets/error.jpg';

function ErrorPage() {
    return (
        <div className="error-page">
            <div className="error-container">
                    <img src={error} alt='error' className='error_img'/>
                <div className="error-content">
                    <div className="error-heading-container">
                        <h1 className="error-heading">Access Denied</h1>
                    </div>
                    <div className="error-text-container">
                        <p className="error-text">You need to log in to access this page.</p>
                        <p className="error-text">Please <Link to="/login" className="error-link">log in</Link> first.</p>
                    </div>
                    <div className="error-image-container">
                        {/* <img src="/images/error-image.png" alt="Error" className="error-image" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;