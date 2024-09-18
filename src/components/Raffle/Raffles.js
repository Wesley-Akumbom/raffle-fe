import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import '../../styles/Home.css'; // Import CSS for consistent styling

const Raffles = () => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await axiosInstance.get('/raffles/list'); // Adjust the endpoint as needed
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
          <div key={raffle.id} className="raffle-card">
            <h3>{raffle.name}</h3>
            <img src={`http://localhost:8000${raffle.prize_img}`} alt={raffle.prize_name} />
            <p>Prize Name: {raffle.prize_name}</p>
            <p>Number of Winners: {raffle.num_winners}</p>
            <div className="button-container"> {/* Wrap buttons in this div */}
              <Link to={`/raffles/${raffle.id}`}>
                <button className="view-raffle-btn">View Details</button>
              </Link>
              <button className="buy-ticket-btn">Buy Ticket</button> {/* Add Buy Ticket button */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Raffles;