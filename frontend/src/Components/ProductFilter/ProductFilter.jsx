import React, { useState } from "react";
import "./ProductFilter.css";

const ProductFilter = ({ onApply }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [primeOnly, setPrimeOnly] = useState(false);

  
  const brands = ["Nike", "Adidas", "Puma", "HRX", "Levi's", "Zara"];
  const discounts = [
    { label: "10% Off or more", value: 10 },
    { label: "25% Off or more", value: 25 },
    { label: "50% Off or more", value: 50 },
    { label: "70% Off or more", value: 70 },
  ];

  const handleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = () => {
    onApply({
      brands: selectedBrands,
      ratings: selectedRatings,
      discount: selectedDiscount,
      prime: primeOnly,
    });
  };

  return (
    <div className="amazon-advanced-filters">
      {/* BRAND FILTER */}
      <div className="filter-section">
        <h4>Brand</h4>
        {brands.map((brand) => (
          <label key={brand} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrand(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      {/* CUSTOMER REVIEW FILTER */}
      <div className="filter-section">
        <h4>Customer Rating</h4>
        {[4, 3, 2].map((rating) => (
          <label key={rating} className="filter-checkbox">
            <input
              type="radio"
              name="rating"
              onChange={() => setSelectedRatings(rating)}
            />
            {rating}★ & up
          </label>
        ))}
      </div>

      {/* DISCOUNT FILTER */}
      <div className="filter-section">
        <h4>Discount</h4>
        {discounts.map((item) => (
          <label key={item.value} className="filter-checkbox">
            <input
              type="radio"
              name="discount"
              onChange={() => setSelectedDiscount(item.value)}
            />
            {item.label}
          </label>
        ))}
      </div>

      {/* PRIME FILTER */}
      <div className="filter-section prime-box">
        <label>
          <input
            type="checkbox"
            checked={primeOnly}
            onChange={() => setPrimeOnly(!primeOnly)}
          />
          Prime Eligible
        </label>
      </div>

      {/* APPLY BUTTON */}
      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilter;
