import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom'; 
import '../../styles/Home.css'; // Import CSS for consistent styling

const RaffleDetail = () => {
  const { id } = useParams(); // Get the raffle ID from route parameters
  const [raffle, setRaffle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        const response = await axiosInstance.get(`/raffles/${id}`);
        setRaffle(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching raffle:', err);
        setError('Failed to fetch raffle');
        setLoading(false);
      }
    };

    fetchRaffle();
  }, [id]); // Use id directly here

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Construct full image URL
  const imageUrl = `http://localhost:8000${raffle.prize_img}`;
  console.log('Raffle Data:', raffle);
  console.log('Image URL:', imageUrl);

  return (
    <div className="home-container"> {/* Use home-container for consistent padding */}
      <div className="raffle-card"> {/* Use raffle-card for consistent styling */}
        <h2>{raffle.name}</h2>
        <img src={imageUrl} alt={raffle.prize_name} /> 
        <p>Prize Name: {raffle.prize_name}</p>
        <p>Possible Number of Winners: {raffle.num_winners}</p>
      </div>
    </div>
  );
};

export default RaffleDetail;