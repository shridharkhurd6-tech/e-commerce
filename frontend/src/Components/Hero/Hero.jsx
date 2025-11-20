import React from 'react';
import './Hero.css';

import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const goToLatestCollection = () => {
    navigate('/latest'); // Change route if needed
  };

  return (
    <section className="hero">
      {/* LEFT TEXT SECTION */}
      <div className="hero-left">
        <h2 className="hero-subtitle">NEW ARRIVALS ONLY</h2>

        <div className="hero-text">
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="Hand icon" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>

        <button
          className="hero-latest-btn"
          onClick={goToLatestCollection}
        >
          <span>Latest Collection</span>
          <img src={arrow_icon} alt="Arrow Icon" />
        </button>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className="hero-right">
        <img
          src={hero_image}
          alt="Showcasing clothes"
          className="hero-main-img"
        />
      </div>
    </section>
  );
};

export default Hero;
