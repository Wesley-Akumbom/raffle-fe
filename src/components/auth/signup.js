// src/components/Auth/SignUp.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', {
                username,
                password,
            });
            setSuccessMessage('Registration successful! You can now sign in.');
            setUsername('');
            setPassword('');
            // Navigate to sign-in page after successful registration
            navigate('/signin');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

  
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <button type="submit" className="btn btn-indigo">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;