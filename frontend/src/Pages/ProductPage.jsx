import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import "./CSS/ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/product/${productId}`);
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.image);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };
    loadProduct();
  }, [productId]);

  if (!product) return <h2 className="loading">Loading product...</h2>;

  const images = [product.image, ...(product.images || [])];

  return (
    <section className="amazon-product-page">

      {/* ====================== */}
      {/* BREADCRUMBS */}
      {/* ====================== */}
      <Breadcrums items={[{ label: product.name, to: `/product/${product.id}` }]} />


      <div className="amazon-3col-grid">

        {/* ====================== */}
        {/* IMAGE GALLERY */}
        {/* ====================== */}
        <div className="amazon-gallery">
          <div className="amazon-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.name}
                className={`thumb ${activeImage === img ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>

          <div className="amazon-main-img">
            <img src={activeImage} alt={product.name} />
          </div>
        </div>

        {/* ====================== */}
        {/* PRODUCT DETAILS */}
        {/* ====================== */}
        <div className="amazon-product-info">
          <h1 className="product-title">{product.name}</h1>

          <p className="rating">
            ⭐⭐⭐⭐⭐ <span>({product.reviews || 140})</span>
          </p>

          <div className="price-block">
            <span className="new">₹{product.new_price}</span>
            <span className="old">₹{product.old_price}</span>
            <span className="save">
              Save ₹{product.old_price - product.new_price}
            </span>
          </div>

          {/* Highlights */}
          <div className="highlights">
            <h3>About this item</h3>
            <ul>
              {(product.highlights || ["No highlights provided"]).map(
                (point, i) => (
                  <li key={i}>{point}</li>
                )
              )}
            </ul>
          </div>

          {/* Description */}
          <div className="description">
            <h3>Product Description</h3>
            <p>{product.description || "No description available."}</p>
          </div>
        </div>

        {/* ====================== */}
        {/* BUY BOX (RIGHT COLUMN) */}
        {/* ====================== */}
        <div className="amazon-buy-box">
          <p className="buy-price">₹{product.new_price}</p>

          <p className="delivery-text">FREE delivery Tomorrow</p>

          <p className="in-stock">In stock</p>

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>

          <button className="buy-now-btn">Buy Now</button>

          <label className="gift-check">
            <input type="checkbox" /> Add gift options
          </label>
        </div>

      </div>

      {/* ====================== */}
      {/* RELATED PRODUCTS */}
      {/* ====================== */}
      <RelatedProducts category={product.category} />

    </section>
  );
};

export default ProductPage;
