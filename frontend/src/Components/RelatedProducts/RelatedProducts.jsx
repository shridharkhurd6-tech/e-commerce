import React from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from "../Items/Item";

const RelatedProducts = () => {
  return (
    <section className="related-products">
      <div className="related-header">
        <h2>Products related to this item</h2>
      </div>

      <div className="related-scroll">
        {data_product && data_product.length > 0 ? (
          data_product.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p className="no-related">No related products found.</p>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
