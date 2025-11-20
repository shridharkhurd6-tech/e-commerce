import React from "react";
import "./Item.css";
import primeIcon from "../Assets/prime.png"; // Add small prime badge (20px PNG)
import { useNavigate } from "react-router-dom";

const Item = ({ id, name, image, new_price, old_price, rating, reviews, prime }) => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/product/${id}`);
  };

  const hasDeal = old_price && Number(old_price) > Number(new_price);

  return (
    <div className="product-card" onClick={goToProduct}>
      
      {/* Deal Ribbon */}
      {hasDeal && <div className="deal-tag">Deal</div>}

      {/* Product Image */}
      <div className="product-media">
        <img src={image} alt={name} loading="lazy" />
      </div>

      {/* Product Body */}
      <div className="product-body">
        
        {/* Title */}
        <h2 className="product-title">{name}</h2>

        {/* Ratings */}
        {rating && (
          <div className="product-rating">
            <div className="stars">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </div>
            {reviews && <span>({reviews})</span>}
          </div>
        )}

        {/* Price Section */}
        <div className="product-price">
          <span className="price-new">₹{new_price}</span>
          {old_price && <span className="price-old">₹{old_price}</span>}
        </div>

        {/* Prime Badge */}
        {prime && (
          <div className="prime-badge">
            <img src={primeIcon} alt="Prime" />
            <span>Prime</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              alert("Added to Cart (demo)");
            }}
          >
            Add to Cart
          </button>

          <button
            className="btn btn-outline"
            onClick={(e) => {
              e.stopPropagation();
              alert("Added to Wishlist (demo)");
            }}
          >
            ♥
          </button>
        </div>

      </div>
    </div>
  );
};

export default Item;
