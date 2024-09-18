import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Make the login request to the API
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });
      
      // Store the access token in localStorage
      const token = response.data.access;  // Access token
      localStorage.setItem('token', token);

      // Decode the token to get the user ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decoding the JWT payload
      const userId = decodedToken.user_id;  // Extract user_id from the decoded payload
      
      // Optionally, store the user_id in localStorage if needed elsewhere
      localStorage.setItem('user_id', userId);

      // Navigate to the home page
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      redirectText="Don't have an account yet?"
      redirectTo="/signup"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn-auth">Sign In</button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
