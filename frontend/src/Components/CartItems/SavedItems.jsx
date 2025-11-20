import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./SavedItems.css";

const SavedItems = () => {
  const { savedItems, moveToCart } = useContext(ShopContext);

  if (savedItems.length === 0) return null;

  return (
    <div className="saved-items-container">
      <h2>Saved for later</h2>

      {savedItems.map((item) => (
        <div className="saved-item-row slide-in" key={item.id}>
          <div className="saved-item-img">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="saved-item-details">
            <h3>{item.name}</h3>
            <p className="price-new">₹{item.new_price}</p>

            <button className="move-to-cart-btn" onClick={() => moveToCart(item)}>
              Move to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedItems;
