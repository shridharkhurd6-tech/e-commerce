import React from "react";
import "./Offers.css";
import { useNavigate } from "react-router-dom";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  const navigate = useNavigate();

  return (
    <section className="offers">
      {/* Left Content */}
      <div className="offers-left">
        <h1 className="offers-title">Exclusive</h1>
        <h1 className="offers-title">Offers for You</h1>
        <p className="offers-text">Only on Best-Selling Products</p>
        <button className="offers-btn" onClick={() => navigate("/bestsellers")}>
          Check Now →
        </button>
      </div>

      {/* Right Image */}
      <div className="offers-right">
        <img
          src={exclusive_image}
          alt="Exclusive offer on best-selling products"
        />
      </div>
    </section>
  );
};

export default Offers;
