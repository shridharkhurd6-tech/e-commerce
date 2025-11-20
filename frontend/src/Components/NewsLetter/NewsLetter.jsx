import React, { useEffect, useState } from "react";
import "./NewsLetter.css";
import mailIcon from "../Assets/mail-icon.png"; // small mail icon in assets

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [showButton, setShowButton] = useState(true);

  // Load saved email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("newsletter-email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Floating button auto-hide on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle subscription submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert("🎉 Subscribed successfully!");
        localStorage.setItem("newsletter-email", email);
      } else {
        alert(data.message || "Subscription failed, please try again.");
      }

      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-card">
        <h1 className="newsletter-title">Get Exclusive Offers on Your Email</h1>
        <p className="newsletter-text">
          Subscribe to our newsletter and stay updated with the latest deals!
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <img src={mailIcon} alt="mail icon" className="input-icon" />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Floating Subscribe Button */}
      <button
        className={`newsletter-floating-btn ${showButton ? "visible" : "hidden"}`}
        onClick={handleSubmit}
      >
        📧 Subscribe →
      </button>
    </section>
  );
};

export default NewsLetter;
