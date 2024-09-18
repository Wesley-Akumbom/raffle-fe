import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Raffle Draw</h1>
        <Camera size={32} color="#4b0082" className="camera" />
      </div>
      <nav className="header-nav">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/raffles" className="nav-link">Raffles</Link>
        <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
      </nav>
    </header>
  );
};

export default Header;