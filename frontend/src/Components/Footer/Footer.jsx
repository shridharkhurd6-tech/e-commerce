import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="Shopper Logo" />
        <p>Shree Prati Ramraj Cloth Shop</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icons">
        <div className="footer-icon-container">
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
               <img src={instagram_icon} alt="Instagram" />
             </a>

        </div>
        <div className="footer-icon-container">
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <img src={pintester_icon} alt="Pinterest" />
          </a>
        </div>
        <div className="footer-icon-container">
          <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>© {new Date().getFullYear()} Shree Prati Ramraj Cloth Shop — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer; 