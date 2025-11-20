import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Items/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

        const response = await fetch(`${API_URL}/popularinwomen`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPopularProducts(data);
      } catch (error) {
        console.error("❌ Failed to fetch popular products:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <section className="amazon-popular-section">
      <h1 className="amazon-popular-title">Popular in Women's Fashion</h1>
      <hr className="amazon-popular-divider" />

      <div className="amazon-popular-grid">
        {popularProducts.length > 0 ? (
          popularProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p className="amazon-loading">⏳ Loading Amazon-style products...</p>
        )}
      </div>
    </section>
  );
};

export default Popular;
