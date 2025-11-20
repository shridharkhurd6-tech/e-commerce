# 🔌 API Endpoints Reference Guide

## Base URL
```
http://localhost:4000
```

---

## 👥 Authentication Endpoints

### Register New Admin User
```http
POST /signup
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### Admin Login
```http
POST /login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "userId": "507f1f77bcf86cd799439011",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 📦 Product Endpoints

### Upload Product Image
```http
POST /upload
Content-Type: multipart/form-data

file: [binary image file]
```

**Response (Success):**
```json
{
  "success": true,
  "image_url": "http://localhost:4000/images/product_1731234567890.jpg"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to upload image"
}
```

---

### Add New Product
```http
POST /addproduct
Content-Type: application/json
Headers: auth-token (optional)

{
  "name": "Cotton T-Shirt",
  "category": "Men",
  "new_price": 399,
  "old_price": 499,
  "image": "http://localhost:4000/images/product_1731234567890.jpg"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "id": "prod_1731234567890",
    "name": "Cotton T-Shirt",
    "category": "Men",
    "new_price": 399,
    "old_price": 499,
    "image": "...",
    "date": "2024-11-15T10:30:00.000Z",
    "available": true
  }
}
```

---

### Get All Products
```http
GET /allproducts
```

**Response (Success):**
```json
{
  "success": true,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "id": "prod_1731234567890",
      "name": "Cotton T-Shirt",
      "category": "Men",
      "new_price": 399,
      "old_price": 499,
      "image": "...",
      "date": "2024-11-15T10:30:00.000Z",
      "available": true
    },
    // ... more products
  ]
}
```

---

### Edit Product
```http
POST /editproduct
Content-Type: application/json

{
  "id": "prod_1731234567890",
  "name": "Updated Product Name",
  "category": "Women",
  "new_price": 349,
  "old_price": 449
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

---

### Remove Product
```http
POST /removeproduct
Content-Type: application/json

{
  "id": "prod_1731234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product removed successfully"
}
```

---

## 📋 Order Endpoints

### Get All Orders
```http
GET /orders
```

**Response (Success):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "orderId": "ORD-1731234567890",
      "customer": "John Doe",
      "email": "john@example.com",
      "status": "Pending",
      "total": 1299,
      "date": "2024-11-15T10:30:00.000Z",
      "items": 3,
      "address": "123 Main St, City",
      "products": []
    },
    // ... more orders
  ]
}
```

---

### Get Specific Order
```http
GET /order/:orderId

Example: GET /order/ORD-1731234567890
```

**Response (Success):**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439012",
    "orderId": "ORD-1731234567890",
    "customer": "John Doe",
    "email": "john@example.com",
    "status": "Pending",
    "total": 1299,
    "date": "2024-11-15T10:30:00.000Z",
    "items": 3,
    "address": "123 Main St, City",
    "products": []
  }
}
```

---

### Create New Order
```http
POST /addorder
Content-Type: application/json

{
  "customer": "John Doe",
  "email": "john@example.com",
  "status": "Pending",
  "total": 1299,
  "items": 3,
  "address": "123 Main St, City",
  "products": []
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "ORD-1731234567890"
}
```

---

### Update Order Status
```http
POST /updateorder
Content-Type: application/json

{
  "orderId": "ORD-1731234567890",
  "status": "Shipped"
}
```

**Status Options:**
- `Pending` - Order received, awaiting processing
- `Shipped` - Order dispatched
- `Delivered` - Order arrived at customer
- `Cancelled` - Order cancelled

**Response (Success):**
```json
{
  "success": true,
  "message": "Order updated successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439012",
    "orderId": "ORD-1731234567890",
    "customer": "John Doe",
    "email": "john@example.com",
    "status": "Shipped",
    "total": 1299,
    "date": "2024-11-15T10:30:00.000Z",
    "items": 3,
    "address": "123 Main St, City",
    "products": []
  }
}
```

---

### Delete Order
```http
POST /deleteorder
Content-Type: application/json

{
  "orderId": "ORD-1731234567890"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

## 🛒 Cart Endpoints (Frontend Feature)

### Add to Cart
```http
POST /addtocart
Content-Type: application/json
Headers: auth-token (required)

{
  "itemId": "prod_1731234567890"
}
```

---

### Remove from Cart
```http
POST /removefromcart
Content-Type: application/json
Headers: auth-token (required)

{
  "itemId": "prod_1731234567890"
}
```

---

### Get Cart
```http
GET /getcart
Headers: auth-token (required)
```

---

## 🔒 Authentication Headers

For protected endpoints, include the JWT token received from login/signup:

```http
Headers: {
  "Content-Type": "application/json",
  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📱 cURL Examples

### Register
```bash
curl -X POST http://localhost:4000/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"test123"}'
```

### Get All Products
```bash
curl -X GET http://localhost:4000/allproducts
```

### Get All Orders
```bash
curl -X GET http://localhost:4000/orders
```

### Update Order Status
```bash
curl -X POST http://localhost:4000/updateorder \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORD-1731234567890","status":"Shipped"}'
```

---

## 🧪 Postman Collection

**Import into Postman:**

```json
{
  "info": {
    "name": "E-Commerce Admin API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "url": "http://localhost:4000/signup",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"admin@example.com\",\"password\":\"test123\"}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:4000/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"admin@example.com\",\"password\":\"test123\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Products",
      "item": [
        {
          "name": "Get All Products",
          "request": {
            "method": "GET",
            "url": "http://localhost:4000/allproducts"
          }
        },
        {
          "name": "Add Product",
          "request": {
            "method": "POST",
            "url": "http://localhost:4000/addproduct",
            "body": {
              "mode": "raw",
              "raw": "{\"name\":\"T-Shirt\",\"category\":\"Men\",\"new_price\":399,\"old_price\":499,\"image\":\"url\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Orders",
      "item": [
        {
          "name": "Get All Orders",
          "request": {
            "method": "GET",
            "url": "http://localhost:4000/orders"
          }
        },
        {
          "name": "Update Order",
          "request": {
            "method": "POST",
            "url": "http://localhost:4000/updateorder",
            "body": {
              "mode": "raw",
              "raw": "{\"orderId\":\"ORD-123\",\"status\":\"Shipped\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## ⚠️ Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Descriptive error message",
  "error": "Detailed error information (if applicable)"
}
```

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Auth token missing/invalid |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Backend error |

---

## 🔗 Complete Data Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  image: String (URL),
  category: String,
  new_price: Number,
  old_price: Number,
  date: Date,
  available: Boolean
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  orderId: String (unique, e.g., "ORD-1731234567890"),
  customer: String,
  email: String,
  status: String (enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled']),
  total: Number,
  date: Date,
  items: Number,
  address: String,
  products: [ObjectId] (references Product)
}
```

---

## 🎯 Quick Reference

| Action | Endpoint | Method |
|--------|----------|--------|
| Register | /signup | POST |
| Login | /login | POST |
| Upload Image | /upload | POST |
| Add Product | /addproduct | POST |
| List Products | /allproducts | GET |
| Edit Product | /editproduct | POST |
| Delete Product | /removeproduct | POST |
| Get Orders | /orders | GET |
| Get Order | /order/:id | GET |
| Add Order | /addorder | POST |
| Update Status | /updateorder | POST |
| Delete Order | /deleteorder | POST |

---

**All endpoints save data to MongoDB Atlas - Your e-commerce app is now database-driven! 🚀**

