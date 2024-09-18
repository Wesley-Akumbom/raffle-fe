import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import axiosInstance from '../../axiosInstance';
import '../../styles/Tickets.css';

const Ticket = () => {
  const { id } = useParams();  // Get the ticket ID from route parameters
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');  // Track payment status
  const navigate = useNavigate();  // Use navigate for routing

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axiosInstance.get(`/tickets/${id}`);
        setTicket(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Failed to fetch ticket information');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  // Function to handle payment
  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post('/payments/purchase/', {
        ticket_id: id,
        payment_method_id: 'pm_card_visa'  // Assuming a test payment method
      });

      if (response.data.payment.payment_status === 'succeeded') {
        setPaymentStatus('Payment successful!');
        navigate('/success');  // Navigate to the success page
      } else {
        setPaymentStatus('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ticket-container">
      <h2>Buy Ticket for {ticket.name}</h2>
      <p>Price: ${ticket.price}</p> 

      {/* Payment status message */}
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}

      {/* Button to initiate payment */}
      <button className="pay-btn" onClick={handlePayment}>
        <i className="fas fa-credit-card"></i> Pay Now
      </button>
    </div>
  );
};

export default Ticket;
