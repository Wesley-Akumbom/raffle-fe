import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Success.css';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase. You will be redirected to the home page shortly.</p>
      <i className="fas fa-check-circle success-icon"></i>
    </div>
  );
};

export default Success;
