import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";

const CartItems = () => {
  const { cartItems, products, updateCartQty, removeFromCart, saveForLater } =
    useContext(ShopContext);

  const cartProducts = products.filter((p) => cartItems[p.id] > 0);

  return (
    <div className="cart-items-container">
      {cartProducts.map((item) => (
        <div key={item.id} className="cart-item-row slide-in">
          {/* Image */}
          <div className="cart-item-img">
            <img src={item.image} alt={item.name} />
          </div>

          {/* Details */}
          <div className="cart-item-details">
            <h3 className="item-name">{item.name}</h3>

            <p className="item-status">In stock</p>

            {/* Controls */}
            <div className="cart-controls">
              <select
                className="qty-select"
                value={cartItems[item.id]}
                onChange={(e) =>
                  updateCartQty(item.id, Number(e.target.value))
                }
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    Qty: {n + 1}
                  </option>
                ))}
              </select>

              <button className="link-btn" onClick={() => removeFromCart(item.id)}>
                Delete
              </button>

              <button className="link-btn" onClick={() => saveForLater(item)}>
                Save for later
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="cart-item-price">
            <h3>₹{item.new_price * cartItems[item.id]}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
