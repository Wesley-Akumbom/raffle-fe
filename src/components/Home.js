import React, { useState, useEffect } from 'react';
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
        
        // Map through ticket holders and fetch corresponding ticket and raffle details
        const rafflesWithDetails = await Promise.all(response.data.map(async (ticketHolder) => {
          const ticketId = ticketHolder.ticket; // Get ticket ID
          
          // Fetch ticket details to get price and raffle ID
          const ticketResponse = await axiosInstance.get(`/tickets/${ticketId}`);
          console.log('Ticket response:', ticketResponse);
          console.log('Ticket response data:', ticketResponse.data);
          const raffleId = ticketResponse.data.raffle; // Get raffle ID
          console.log('Raffle ID:', raffleId);
          // Fetch raffle details using the raffle ID
          const raffleResponse = await axiosInstance.get(`/raffles/${raffleId}`); 
          
          return {
            ...ticketHolder,
            raffle_name: raffleResponse.data.name, // Get raffle name from raffle response
          };
        }));

        setUserRaffles(rafflesWithDetails);
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
              <p>Draw Date: {new Date('01/12/2024').toLocaleDateString()}</p>
              <button className="view-raffle-btn">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;