// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={
            <>
              <Header />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;