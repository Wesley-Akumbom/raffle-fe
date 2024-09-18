// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;