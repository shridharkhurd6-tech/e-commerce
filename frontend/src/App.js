import React from "react";
import "./Apps.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ShopPage from "./Pages/Shop/ShopPage";
import ShopCategory from "./Pages/ShopCategory";
import ProductPage from "./Pages/ProductPage"; // Amazon-style PDP
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import BestSellers from "./Pages/BestSellers";
import Checkout from "./Pages/Checkout";

import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import ScrollProgressBar from "./Components/ScrollProgress/ScrollProgressBar";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollProgressBar />
        <Navbar />

        <Routes>
          {/* Default → Shop */}
          <Route path="/" element={<Navigate to="/shop" />} />

          {/* Shop Home */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Category Pages */}
          <Route
            path="/men"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/women"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />

          {/* Single Product Page */}
          <Route path="/product/:productId" element={<ProductPage />} />

          {/* Cart (Protected) */}
          <Route
            path="/cart"
            element={
              localStorage.getItem("auth-token") ? <Cart /> : <LoginSignup />
            }
          />

          {/* Login */}
          <Route path="/login" element={<LoginSignup />} />

          {/* Best Sellers */}
          <Route path="/bestsellers" element={<BestSellers />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
