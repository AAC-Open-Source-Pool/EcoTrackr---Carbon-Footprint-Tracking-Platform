// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EcoTrack from './EcoTrack';
import Community from './Community';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EcoTrack />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
