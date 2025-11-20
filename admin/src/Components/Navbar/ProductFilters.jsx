import React from "react";
import "./ProductFilters.css";


const ProductFilters = ({ search, onSearch }) => {
return (
<div className="product-filters">
<input
type="text"
placeholder="Search product..."
value={search}
onChange={(e) => onSearch(e.target.value)}
/>
</div>
);
};


export default ProductFilters;