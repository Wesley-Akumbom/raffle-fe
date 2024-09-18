import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import '../../styles/Raffles.css';  

const RaffleCard = ({ raffle }) => {
  return (
    <div className="raffle-card">
      <h3>{raffle.name}</h3>
      <img src={`http://localhost:8000${raffle.prize_img}`} alt={raffle.prize_name} />
      <p>Prize Name: {raffle.prize_name}</p>
      <p>Number of Winners: {raffle.num_winners}</p>
      <div className="button-container">
        <Link to={`/raffles/${raffle.id}`}>
          <button className="view-raffle-btn">
            <i className="fas fa-info-circle" /> View Details
          </button>
        </Link>
        {/* Use ticket_id instead of raffle.id */}
        <Link to={`/tickets/${raffle.ticket_id}`}>
           <button className="buy-ticket-btn">Buy Ticket</button>
         </Link>
      </div>
    </div>
  );
};

const Raffles = () => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await axiosInstance.get('/raffles/list');
        setRaffles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching raffles:', err);
        setError('Failed to fetch raffles');
        setLoading(false);
      }
    };

    fetchRaffles();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h2>Available Raffles</h2>
      <div className="raffle-grid">
        {raffles.map(raffle => (
          <RaffleCard key={raffle.id} raffle={raffle} />
        ))}
      </div>
    </div>
  );
};

export default Raffles;