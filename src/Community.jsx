
import React, { useState } from 'react';
import './Community.css';
import { Link } from 'react-router-dom';

const Community = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="eco-page">
      <button
        className="hamburger"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        ☰
      </button>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="profile-pic" />
        <ul>
          <li>Control Center</li>
          <li>Impact Center</li>
          <li>Rewards</li>
          <li>Community</li>
          <li>Settings</li>
        </ul>
        <div className="logo">🌱 ECOTRACK</div>
      </div>

      <div className={`main ${sidebarOpen ? 'shift' : ''}`}>
        <h1>Community Challenges</h1>
        <p className="subtitle">Join challenges and compete with friends</p>

        <h2>Ongoing Challenges</h2>
        <div className="challenge">
          <div><span className="icon">🚴‍♂️</span> Cycling</div>
          <button className="join-btn">Join</button>
        </div>
        <div className="challenge">
          <div><span className="icon">🌱</span> Plant Trees</div>
          <button className="join-btn">Join</button>
        </div>
        <div className="challenge">
          <div><span className="icon">🧹</span> Clean-up</div>
          <button className="join-btn">Join</button>
        </div>

        <div className="leaderboard">
          <h2>Friends Leaderboard</h2>
          <div className="leaderboard-item"><span>Alice</span><span>42 trees</span></div>
          <div className="leaderboard-item"><span>David</span><span>20 trees</span></div>
          <div className="leaderboard-item"><span>Sarah</span><span>15 trees</span></div>
        </div>

        {/* 🔁 Back to EcoTrack Page */}
        <div style={{ marginTop: '30px' }}>
          <Link to="/" className="nav-link">← Back to Knowledge Hub</Link>
        </div>
      </div>
    </div>
  );
};

export default Community;
