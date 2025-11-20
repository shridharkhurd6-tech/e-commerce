import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
import { useNavigate } from "react-router-dom";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
        const response = await fetch(`${API_URL}/newcollections`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setNewCollection(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  // Floating button show/hide on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="new-collections">
      <div className="section-header">
        <h1 className="section-title">New Arrivals</h1>
        <button className="view-all-btn" onClick={() => navigate("/shop")}>
          View All →
        </button>
      </div>
      <hr className="section-divider" />

      <div className="collections-grid">
        {newCollection.length > 0 ? (
          newCollection.slice(0, 8).map((item) => (
            <Item key={item.id || item._id} product={item} />
          ))
        ) : (
          <p className="loading-text">Loading new arrivals...</p>
        )}
      </div>

      {/* Floating Button */}
      <button
        className={`view-all-btn-floating ${showButton ? "visible" : "hidden"}`}
        onClick={() => navigate("/shop")}
      >
        View All →
      </button>
    </section>
  );
};

export default NewCollections;
