import React, { useContext } from "react";
import CartItems from "../Components/CartItems/CartItems";
import SavedItems from "../Components/CartItems/SavedItems";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/Cart.css";

const Cart = () => {
  const { getTotalCartItems, getTotalCartAmount } = useContext(ShopContext);

  const totalItems = getTotalCartItems();
  const totalAmount = getTotalCartAmount();

  return (
    <section className="cart-page-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* LEFT SIDE – ITEMS */}
        <div className="cart-left">
          {totalItems > 0 ? (
            <CartItems />
          ) : (
            <h2 className="empty-cart">Your cart is empty.</h2>
          )}

          {/* Save for Later Section */}
          <SavedItems />
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        {totalItems > 0 && (
          <aside className="order-summary">
            <p className="summary-subtotal">
              Subtotal ({totalItems} items):{" "}
              <span className="price-bold">₹{totalAmount}</span>
            </p>

            {/* Gift Option */}
            <label className="gift-option">
              <input type="checkbox" /> This order contains a gift
            </label>

            {/* Checkout */}
            <button className="checkout-btn">Proceed to Checkout</button>

            {/* Buy Now */}
            <button className="buy-now-btn">Buy Now</button>
          </aside>
        )}
      </div>
    </section>
  );
};

export default Cart;
