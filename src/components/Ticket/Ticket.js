import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import '../../styles/Tickets.css';

const Ticket = () => {
  const { id } = useParams(); // Get the ticket ID from route parameters
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        console.log(`Fetching: /tickets/${id}`);
        // Adjusted endpoint to fetch ticket information
        const response = await axiosInstance.get(`/tickets/${id}`);
        setTicket(response.data);
        
        // Print the ticket price to console
        console.log('Ticket Price:', response.data.price);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Failed to fetch ticket information');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return (
    <div className="loading">
      <i className="fas fa-spinner fa-spin"></i> Loading...
    </div>
  );
  if (error) return (
    <div className="error">
      <i className="fas fa-exclamation-triangle"></i> {error}
    </div>
  );

  return (
    <div className="ticket-container">
      <h2>Buy Ticket for {ticket.name}</h2>
      <p>Price: ${ticket.price}</p> 
      <button className="pay-btn">
        <i className="fas fa-credit-card"></i> Pay Now
      </button>
    </div>
  );
};

export default Ticket;