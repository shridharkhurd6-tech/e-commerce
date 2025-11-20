import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import prime_icon from '../Assets/prime.png'; // optional
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [mainImage, setMainImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  // If product not received yet
  if (!product) {
    return <div className="productdisplay">Loading product...</div>;
  }

  // Gallery (Amazon-style: main image + duplicates if no gallery provided)
  const productImages = product.images?.length > 0 
    ? product.images 
    : [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id);
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size before proceeding.");
      return;
    }
    addToCart(product.id);
    navigate("/checkout");
  };

  return (
    <section className="productdisplay">

      {/* LEFT: Image Gallery */}
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} - view ${index + 1}`}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? "active-thumbnail" : ""}
            />
          ))}
        </div>

        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={mainImage}
            alt={product.name}
          />
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="productdisplay-right">

        {/* Title */}
        <h1 className="product-name">{product.name}</h1>

        {/* Prime Badge */}
        <div className="prime-info">
          <img src={prime_icon} alt="Prime" className="prime-badge" />
          <span>FREE delivery by tomorrow</span>
        </div>

        {/* Ratings */}
        <div className="productdisplay-right-stars">
          {Array(4).fill().map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star" />
          <p className="review-count">(122 ratings)</p>
        </div>

        {/* Price Block */}
        <div className="productdisplay-right-price-box">
          <p className="mrp-label">M.R.P: <span className="striked">₹{product.old_price}</span></p>
          <p className="amazon-price">
            Deal Price: <span className="deal-price">₹{product.new_price}</span>
          </p>
          <p className="tax-info">Inclusive of all taxes</p>
        </div>

        {/* Description */}
        <p className="product-desc">
          A premium-quality, comfortable top made for everyday wear.
          Soft fabric, elegant fit — perfect for casual or travel use.
        </p>

        {/* Size Section */}
        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div
                key={size}
                className={`size-box ${selectedSize === size ? "selected-size" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          {selectedSize && (
            <p className="selected-size-label">
              Selected Size: <strong>{selectedSize}</strong>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="productdisplay-buttons">
          <button className="productdisplay-add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="productdisplay-buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {/* Category + Tags */}
        <p className="productdisplay-right-category">
          <span>Category:</span> {product.category || "Women's Fashion"}
        </p>

        <p className="productdisplay-right-category">
          <span>Tags:</span> {product.tags?.join(", ") || "Trending, Latest"}
        </p>
      </div>
    </section>
  );
};

export default ProductDisplay;
