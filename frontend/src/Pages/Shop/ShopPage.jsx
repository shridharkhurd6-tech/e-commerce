import React from "react";
import "./ShopPage.css";

// Components used in Amazon-style homepage
import Hero from "../../Components/Hero/Hero";
import Popular from "../../Components/Popular/Popular";
import Offers from "../../Components/Offers/Offers";
import NewCollections from "../../Components/NewCollections/NewCollections";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import CategoryTiles from "../../Components/CategoryTiles/CategoryTiles";
import DealsCarousel from "../../Components/DealsCarousel/DealsCarousel";

const ShopPage = () => {
  return (
    <div className="amazon-home">
      
      {/* Amazon Hero Banner */}
      <Hero />

      {/* Category Grid like Amazon */}
      <section className="amazon-section">
        <CategoryTiles />
      </section>

      {/* Deals of the Day Carousel */}
      <section className="amazon-section">
        <h2 className="amazon-title">Today's Deals</h2>
        <DealsCarousel />
      </section>

      {/* Popular Slider */}
      <section className="amazon-section">
        <h2 className="amazon-title">Popular Products</h2>
        <Popular />
      </section>

      {/* Offers */}
      <section className="amazon-section">
        <h2 className="amazon-title">Best Offers</h2>
        <Offers />
      </section>

      {/* New Arrivals */}
      <section className="amazon-section">
        <h2 className="amazon-title">New Collections</h2>
        <NewCollections />
      </section>

      {/* Newsletter */}
      <section className="amazon-section">
        <NewsLetter />
      </section>

    </div>
  );
};

export default ShopPage;
