import React, { useState } from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  const [tab, setTab] = useState("description");

  return (
    <div className="amazon-desc-box">

      {/* Tabs */}
      <div className="amazon-desc-tabs">
        <button
          className={`desc-tab ${tab === "description" ? "active" : ""}`}
          onClick={() => setTab("description")}
        >
          Product Description
        </button>

        <button
          className={`desc-tab ${tab === "reviews" ? "active" : ""}`}
          onClick={() => setTab("reviews")}
        >
          Reviews (130)
        </button>
      </div>

      {/* Content */}
      <div className="amazon-desc-content">
        {tab === "description" ? (
          <>
            <h3>About this item</h3>
            <ul className="amazon-bullet-list">
              <li>High quality guaranteed product</li>
              <li>Comfortable and durable, suitable for daily use</li>
              <li>Modern stylish design inspired by trending fashion</li>
              <li>Perfect stitching and long-lasting fabric</li>
            </ul>

            <p className="amazon-full-desc">
              An e-commerce website is an online platform that facilitates
              the buying and selling of products or services over the internet.
              It serves as a virtual marketplace where businesses and individuals
              showcase their products, interact with customers, and conduct
              transactions globally.
            </p>
          </>
        ) : (
          <p className="amazon-empty-reviews">No reviews added yet.</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
