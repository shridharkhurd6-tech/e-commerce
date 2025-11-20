import React, { useState, useEffect } from "react";
import "./ProductFilters.css";

const ProductFilters = ({ onChange, categories = ["All", "Women", "Men", "Kid"], initial = {} }) => {
  const [search, setSearch] = useState(initial.search || "");
  const [category, setCategory] = useState(initial.category || "All");
  const [minPrice, setMinPrice] = useState(initial.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice ?? 1000000);
  const [sort, setSort] = useState(initial.sort || "");

  // debounced send up
  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ search, category, minPrice: Number(minPrice), maxPrice: Number(maxPrice), sort });
    }, 300);
    return () => clearTimeout(t);
  }, [search, category, minPrice, maxPrice, sort, onChange]);

  return (
    <div className="product-filters">
      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pf-search"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="pf-select">
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="pf-price">
        <input type="number" value={minPrice} onChange={(e)=> setMinPrice(e.target.value)} placeholder="Min" />
        <span>-</span>
        <input type="number" value={maxPrice} onChange={(e)=> setMaxPrice(e.target.value)} placeholder="Max" />
      </div>

      <select value={sort} onChange={(e)=> setSort(e.target.value)} className="pf-select">
        <option value="">Sort</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
