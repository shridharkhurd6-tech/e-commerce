// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  PRODUCTS: {
    ALL: `${API_BASE_URL}/allproducts`,
    NEW_COLLECTIONS: `${API_BASE_URL}/newcollections`,
    POPULAR_WOMEN: `${API_BASE_URL}/popularinwomen`,
    BEST_SELLERS: `${API_BASE_URL}/bestsellers`,
    ADD: `${API_BASE_URL}/addproduct`,
    REMOVE: `${API_BASE_URL}/removeproduct`,
    UPLOAD: `${API_BASE_URL}/upload`,
  },
  AUTH: {
    SIGNUP: `${API_BASE_URL}/signup`,
    LOGIN: `${API_BASE_URL}/login`,
  },
  CART: {
    GET: `${API_BASE_URL}/getcart`,
    ADD: `${API_BASE_URL}/addtocart`,
    REMOVE: `${API_BASE_URL}/removefromcart`,
  },
  NEWSLETTER: {
    SUBSCRIBE: `${API_BASE_URL}/subscribe`,
  },
};

export default API_BASE_URL;
