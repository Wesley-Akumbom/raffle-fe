import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Home from './components/Home';
import RaffleDetail from './components/Raffle/RaffleDetail';
import Raffles from './components/Raffle/Raffles'; // Import the new Raffles component
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Make SignIn the default page */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Protected route for the home page */}
          <Route 
            path="/home" 
            element={
              localStorage.getItem('token') ? (
                <>
                  <Header />
                  <Home />
                </>
              ) : (
                <Navigate to="/signin" replace />
              )
            } 
          />
          
          {/* New route for Raffles */}
          <Route 
            path="/raffles" 
            element={
              localStorage.getItem('token') ? (
                <>
                  <Header />
                  <Raffles /> {/* Render the Raffles component */}
                </>
              ) : (
                <Navigate to="/signin" replace />
              )
            } 
          />

          {/* New route for RaffleDetail */}
          <Route 
            path="/raffles/:id" 
            element={
              localStorage.getItem('token') ? (
                <>
                  <Header />
                  <RaffleDetail />
                </>
              ) : (
                <Navigate to="/signin" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;