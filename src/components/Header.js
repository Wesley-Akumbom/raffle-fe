import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="header">
      <h1 className="header-title">10TH ANNIVERSARY DRAW</h1>
      <div className="header-actions">
        <button onClick={handleSignOut} className="btn-signout">Sign Out</button>
      </div>
    </nav>
  );
};

export default Header;