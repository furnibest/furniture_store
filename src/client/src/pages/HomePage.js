import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <main className="hero-section">
      <div className="hero-content">
        <h2 className="subtitle">Premium Furniture from Indonesia</h2>
        <div className="main-title">
          <div className="title-top">LUXURY</div>
          <div className="title-bottom">ARTISAN FURNITURE</div>
        </div>
        <button className="cta-button" onClick={() => navigate('/products')}>Shop Now</button>
      </div>
    </main>
  );
}

export default HomePage; 