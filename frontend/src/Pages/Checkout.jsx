import React, { useContext } from "react";
import "./CSS/Checkout.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartProducts = products.filter((p) => cartItems[p.id] > 0);

  const totalAmount = cartProducts.reduce(
    (sum, item) => sum + item.new_price * cartItems[item.id],
    0
  );

  const totalItems = cartProducts.reduce(
    (sum, item) => sum + cartItems[item.id],
    0
  );

  return (
    <section className="amazon-checkout-wrapper">
      {/* Delivery Info Banner */}
      <div className="checkout-delivery-bar">
        <span>Checkout</span>
        <span className="checkout-step">Address → Payment → Review</span>
      </div>

      <div className="checkout-container">
        {/* LEFT - CART ITEMS */}
        <div className="checkout-left">
          <h2 className="checkout-title">Shopping Cart</h2>

          {cartProducts.length === 0 ? (
            <p className="empty-checkout">Your cart is empty.</p>
          ) : (
            cartProducts.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-img" />

                <div className="item-details">
                  <h3>{item.name}</h3>

                  <p className="item-price">₹{item.new_price}</p>

                  <p className="qty">Qty: {cartItems[item.id]}</p>

                  <p className="subtotal">
                    Subtotal:{" "}
                    <span>₹{item.new_price * cartItems[item.id]}</span>
                  </p>

                  <label className="gift-checkbox">
                    <input type="checkbox" />
                    <span>This is a gift</span>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        {cartProducts.length > 0 && (
          <div className="checkout-right">
            <div className="summary-box">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Items:</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="summary-row">
                <span>Delivery:</span>
                <span className="free">FREE</span>
              </div>

              <div className="summary-total">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                className="proceed-btn"
                onClick={() => navigate("/payment")}
              >
                Proceed to Payment
              </button>

              <button className="buynow-btn">Buy Now</button>

              <label className="gift-options-sm">
                <input type="checkbox" />
                Add gift options
              </label>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;
