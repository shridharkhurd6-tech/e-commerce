import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./DealsCarousel.css";

const DealsCarousel = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="amazon-carousel">
      {products.slice(0, 12).map((item) => (
        <div key={item.id} className="deal-item">
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <span className="deal-price">₹{item.new_price}</span>
        </div>
      ))}
    </div>
  );
};

export default DealsCarousel;
