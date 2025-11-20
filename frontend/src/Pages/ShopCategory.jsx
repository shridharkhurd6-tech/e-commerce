import React, { useContext, useState, useEffect } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Items/Item";
import ProductFilter from "../Components/ProductFilter/ProductFilter";

const ShopCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShopContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  /* -------------------------------------------
      AUTO-DEFAULT PRODUCT FIELDS (Amazon style)
  -------------------------------------------- */
  const applyAutoDefaults = (product) => {
    const brands = ["Nike", "Adidas", "Puma", "Zara", "Levi's", "HRX"];

    return {
      ...product,
      brand: product.brand || brands[Math.floor(Math.random() * brands.length)],
      rating: product.rating || Number((3 + Math.random() * 2).toFixed(1)),
      prime: product.prime !== undefined ? product.prime : Math.random() > 0.35,
      reviews: product.reviews || Math.floor(Math.random() * 2800 + 200),

      highlights:
        product.highlights || [
          "Premium quality fabric",
          "Comfortable for daily wear",
          "Modern stylish design",
          "Durable stitching",
        ],

      discountPercent:
        product.discountPercent || Math.floor(Math.random() * 60 + 10),

      old_price:
        product.old_price ||
        Math.floor(product.new_price * (1 + Math.random() * 0.4 + 0.1)),
    };
  };

  /* --------------------------------------------------------
        LOAD CATEGORY PRODUCTS + APPLY AUTO-DEFAULTS
  --------------------------------------------------------- */
  useEffect(() => {
    if (all_product.length > 0) {
      const initial = all_product
        .filter(
          (item) =>
            item.category?.toLowerCase() === category?.toLowerCase()
        )
        .map(applyAutoDefaults);

      setFilteredProducts(initial);
    }
  }, [all_product, category]);

  /* ------------------------------ */
  /* BASIC FILTER (Price + Search) */
  /* ------------------------------ */
  const handleFilter = ({ priceRange, searchTerm }) => {
    let result = all_product
      .filter((p) => p.category.toLowerCase() === category.toLowerCase())
      .map(applyAutoDefaults);

    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.new_price >= priceRange[0] && p.new_price <= priceRange[1]
    );

    setFilteredProducts(result);
  };

  /* --------------------------- */
  /* ADVANCED AMAZON FILTERS    */
  /* --------------------------- */
  const handleAdvancedFilter = ({ brands, ratings, discount, prime }) => {
    let result = [...filteredProducts];

    if (brands?.length > 0) {
      result = result.filter((p) => brands.includes(p.brand));
    }

    if (ratings) {
      result = result.filter((p) => p.rating >= ratings);
    }

    if (discount) {
      result = result.filter(
        (p) =>
          ((p.old_price - p.new_price) / p.old_price) * 100 >= discount
      );
    }

    if (prime) {
      result = result.filter((p) => p.prime === true);
    }

    setFilteredProducts(result);
  };

  /* ----------------------- */
  /* SORTING LOGIC          */
  /* ----------------------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-low") return a.new_price - b.new_price;
    if (sortOrder === "price-high") return b.new_price - a.new_price;
    return 0;
  });

  /* ----------------------- */
  /* RENDER SECTION          */
  /* ----------------------- */

  return (
    <section className="amazon-category-page">
      {/* Banner */}
      <img
        className="amazon-category-banner"
        src={banner}
        alt={`${category} banner`}
      />

      <div className="amazon-category-content">
        {/* LEFT FILTER SIDEBAR */}
        <aside className="amazon-filter-sidebar">
          <h3 className="sidebar-title">Filters</h3>

          {/* Basic Filter */}
          <ProductFilter onFilter={handleFilter} />

          {/* Advanced Amazon Filter */}
          <ProductFilter advanced onFilter={handleAdvancedFilter} />
        </aside>

        {/* RIGHT SIDE PRODUCTS */}
        <div className="amazon-category-right">
          {/* Sorting */}
          <div className="amazon-sort-bar">
            <p className="results-count">
              {sortedProducts.length} results for <span>"{category}"</span>
            </p>

            <select
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="amazon-product-grid">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
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
              <p className="no-products">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
