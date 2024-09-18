// src/components/Auth/SignIn.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
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
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                username,
                password,
            });
            // Assuming your API returns a token upon successful login
            localStorage.setItem('token', response.data.token); // Store the token in local storage
            setSuccessMessage('Login successful!');
            navigate('/'); // Redirect to home or another page after login
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <h2>Sign In</h2>
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
                <button type="submit" className="btn btn-indigo">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;