import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// Create empty cart structure
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

// 🔥 GLOBAL AUTO-DEFAULT PRODUCT GENERATOR (Amazon style)
const applyAutoDefaults = (product) => {
  const brands = ["Nike", "Adidas", "Puma", "Zara", "Levi's", "HRX"];

  return {
    ...product,

    // BRAND
    brand: product.brand || brands[Math.floor(Math.random() * brands.length)],

    // RATING (3.0 – 5.0)
    rating: product.rating || Number((3 + Math.random() * 2).toFixed(1)),

    // PRIME FLAG
    prime: product.prime !== undefined ? product.prime : Math.random() > 0.35,

    // REVIEWS COUNT (200 – 3000)
    reviews: product.reviews || Math.floor(Math.random() * 2800 + 200),

    // HIGHLIGHTS IF NOT PROVIDED
    highlights: product.highlights || [
      "Premium quality fabric",
      "Comfortable for daily wear",
      "Modern stylish design",
      "Durable stitching",
    ],

    // DISCOUNT % (10–70%)
    discountPercent:
      product.discountPercent || Math.floor(Math.random() * 60 + 10),

    // OLD PRICE AUTO-GENERATE IF MISSING
    old_price:
      product.old_price ||
      Math.floor(product.new_price * (1 + Math.random() * 0.4 + 0.1)),
  };
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ========================================================
  //   FETCH ALL PRODUCTS & APPLY GLOBAL AUTO-DEFAULTS HERE
  // ========================================================
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        // 👇 Apply defaults to every product globally
        const updatedProducts = data.map((p) => applyAutoDefaults(p));
        setAll_Product(updatedProducts);
      })
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  // ========================================================
  // FETCH CART FROM BACKEND
  // ========================================================
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": token,
            "Content-Type": "application/json",
          },
          body: "",
        });

        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, []);

  // ========================================================
  // ADD TO CART
  // ========================================================
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        await fetch("http://localhost:4000/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    }
  };

  // ========================================================
  // REMOVE FROM CART
  // ========================================================
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        await fetch("http://localhost:4000/removefromcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });
      } catch (err) {
        console.error("Remove from cart failed:", err);
      }
    }
  };

  // ========================================================
  // CART TOTAL AMOUNT
  // ========================================================
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find(
          (p) => p.id === Number(item)
        );
        if (product) {
          totalAmount += product.new_price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  // ========================================================
  // TOTAL CART ITEMS COUNT
  // ========================================================
  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) total += cartItems[item];
    }
    return total;
  };

  // ========================================================
  // PROVIDER VALUE
  // ========================================================
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    setAll_Product,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
