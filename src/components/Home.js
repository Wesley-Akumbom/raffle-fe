import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../styles/Home.css';

const Home = () => {
  const [userRaffles, setUserRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRaffles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Decode the JWT token to get the user_id
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.user_id;  // Extract user_id from token payload

        // Fetch user raffles (ticket holders)
        const response = await axiosInstance.get(`/ticket-holders/${userId}`);
        
        // Group ticket holders by raffle and count the number of tickets
        const rafflesWithDetails = await Promise.all(response.data.map(async (ticketHolder) => {
          const ticketId = ticketHolder.ticket; // Get ticket ID
          
          // Fetch ticket details to get price and raffle ID
          const ticketResponse = await axiosInstance.get(`/tickets/${ticketId}`);
          const raffleId = ticketResponse.data.raffle; // Get raffle ID
          
          // Fetch raffle details using the raffle ID
          const raffleResponse = await axiosInstance.get(`/raffles/${raffleId}`); 
          
          return {
            id: raffleId,
            raffle_name: raffleResponse.data.name, // Get raffle name from raffle response
            ticket_count: 1, // Initialize ticket count to 1
          };
        }));

        // Group raffles and count the number of tickets
        const groupedRaffles = {};
        rafflesWithDetails.forEach((raffle) => {
          if (!groupedRaffles[raffle.id]) {
            groupedRaffles[raffle.id] = {
              id: raffle.id,
              raffle_name: raffle.raffle_name,
              ticket_count: 0,
            };
          }
          groupedRaffles[raffle.id].ticket_count++;
        });

        // Convert grouped raffles object to array
        const rafflesArray = Object.values(groupedRaffles);

        setUserRaffles(rafflesArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user raffles:', err); // Log the error to the console
        setError('Failed to fetch user raffles');
        setLoading(false);
      }
    };

    fetchUserRaffles();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h2>Your Raffles</h2>
      {userRaffles.length === 0 ? (
        <p>You haven't entered any raffles yet.</p>
      ) : (
        <div className="raffle-grid">
        {userRaffles.map(raffle => (
          <div key={raffle.id} className="raffle-card">
            <h3>{raffle.raffle_name}</h3>
            <p>Number of tickets: {raffle.ticket_count}</p>
            <p>Draw Date: {new Date('01/12/2024').toLocaleDateString()}</p>
            <Link to={`/raffles/${raffle.id}`}>
          <button className="view-raffle-btn">
            <i className="fas fa-info-circle" /> View Details
          </button>
        </Link>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Home;