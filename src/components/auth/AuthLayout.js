// src/components/Auth/AuthLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, title, redirectText, redirectTo }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2>{title}</h2>
        {children}
        <div className="redirect-text">
          <p>
            {redirectText}{' '}
            <span onClick={() => navigate(redirectTo)} className="redirect-link">
              {redirectTo === '/signin' ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;