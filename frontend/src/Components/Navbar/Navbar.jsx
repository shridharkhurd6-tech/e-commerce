import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/nav-logo.svg";
import cart_icon from "../Assets/cart_icons.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const currentLocation = useLocation(); // renamed to avoid conflict

  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bump, setBump] = useState(false);

  // Total cart items
  const totalCartItems = Object.values(cartItems || {}).reduce((a, b) => a + b, 0);

  // Trigger bump animation on cart change
  useEffect(() => {
    if (totalCartItems === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [totalCartItems]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentLocation.pathname]);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/shop?query=${encodeURIComponent(q)}`);
    else navigate("/shop");
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("admin-user");
    navigate("/login");
  };

  // User initials
  const user = JSON.parse(localStorage.getItem("admin-user") || "null");
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : localStorage.getItem("auth-token")
    ? "U"
    : "";

  return (
    <header className="amazon-nav">
      {/* LEFT */}
      <div className="amazon-left" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="amazon-logo" />
        <div className="amazon-shop-text">
          <span className="line1">Shri Prati Ramraj</span>
          <span className="line2">Cloth Shop</span>
        </div>
        <div className="amazon-location">
          <span className="loc-line1">Deliver to</span>
          <span className="loc-line2">India</span>
        </div>
      </div>

      {/* SEARCH */}
      <form className="amazon-search" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="amazon-search-input"
        />
        <button className="amazon-search-btn">🔍</button>
      </form>

      {/* RIGHT */}
      <div className="amazon-right">
        {/* ACCOUNT */}
        <div className="amazon-account">
          <div className="account-avatar">{initials}</div>
          <div className="account-text">
            <span className="acc-line1">Hello, {user?.name || "User"}</span>
            <span className="acc-line2">Account</span>
          </div>
          <div className="acc-dropdown">
            <button onClick={() => navigate("/orders")}>Your Orders</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* ORDERS */}
        <Link to="/orders" className="amazon-orders">
          Returns & Orders
        </Link>

        {/* CART */}
        <Link to="/cart" className="amazon-cart">
          <img src={cart_icon} alt="cart" />
          <span className={`cart-count ${bump ? "bump" : ""}`}>{totalCartItems}</span>
        </Link>

        {/* MOBILE BUTTON */}
        <button
          className="amazon-mobile-btn"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`amazon-mobile-menu ${mobileOpen ? "show" : ""}`}>
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
        <Link to="/bestsellers">Best Sellers</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/cart">Cart</Link>
      </div>

      {/* DEPARTMENTS */}
      <div className="amazon-departments">
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
        <Link to="/bestsellers">Best Sellers</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </header>
  );
};

export default Navbar;
