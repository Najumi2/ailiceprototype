import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './pages/navigation';
import Login from './pages/login';
import Register from './pages/register';
import { Routes } from 'react-router-dom';
import Chat from './pages/chat';

const App = () => {
  return (
    <Router>
      <div>
        <header className="App-header" style={{ position: 'fixed', top: 0, left: 0, backgroundColor: '#ffffff', padding: '10px' }}>
          <h1 style={{ textAlign: 'left', marginLeft: '10px', marginBottom: 0, fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>AILice</h1>
        </header>
        <div style={{ marginTop: '50px' }}>

          <Navigation />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Render Chat component for /chat route */}
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
