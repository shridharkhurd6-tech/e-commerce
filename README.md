# E-Commerce Project

A full-stack e-commerce application with admin panel, frontend, and backend API.

✨ **NEW:** Complete database integration with MongoDB! All admin operations now persist to database.

## 📚 Documentation

### Quick Links
- **DATABASE_INTEGRATION_SUMMARY.md** - Overview of database implementation
- **DOCUMENTATION_INDEX.md** - Guide to all documentation files
- **TEST_DATABASE_INTEGRATION.md** - Step-by-step testing guide
- **API_REFERENCE.md** - Complete API endpoint documentation
- **IMPLEMENTATION_STATUS.md** - Technical verification checklist

### Database Features
- ✅ User authentication with MongoDB
- ✅ Product management with persistence
- ✅ Order management system
- ✅ Real-time status tracking
- ✅ Professional error handling

## Project Structure

```
e-commerce/
├── admin/              # Admin panel (Vite + React)
├── frontend/           # Customer frontend (React)
├── backend/            # Express API server
└── Ecommerce_Assets/   # Shared assets
```

## Configuration Files

### Backend Configuration
- **`backend/.env`** - Environment variables (MongoDB, JWT secret, port)
- **`backend/.env.example`** - Template for environment variables
- **`backend/package.json`** - Dependencies and scripts

### Frontend Configuration
- **`frontend/package.json`** - Dependencies and build scripts
- **`frontend/src/index.css`** - Global styles (corrected from indexx.css)

### Admin Configuration
- **`admin/vite.config.js`** - Vite build configuration
- **`admin/package.json`** - Dependencies and development scripts

## Setup & Installation

### 1. Backend Setup
```bash
cd backend
npm install
```

Edit `.env` file with your MongoDB connection string and JWT secret.

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Admin Setup
```bash
cd admin
npm install
```

## Running the Project

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
Runs on `http://localhost:4000`

**Frontend:**
```bash
cd frontend
npm start
```
Runs on `http://localhost:3000`

**Admin:**
```bash
cd admin
npm run dev
```
Runs on `http://localhost:5173` (Vite default)

## Recent Corrections Made

✅ Fixed `frontend/package.json` - Removed incorrect `"type": "module"` from dependencies
✅ Fixed `frontend/src/index.js` - Changed import from `indexx.css` to `index.css`
✅ Fixed `frontend/src/App.js` - Removed duplicate routes and corrected CSS imports
✅ Fixed `admin/src/main.jsx` - Removed duplicate BrowserRouter wrapper
✅ Added `backend/.env` - Centralized environment variables
✅ Updated `backend/index.js` - Converted to ES6 imports and environment variables
✅ Added start scripts to `backend/package.json`
✅ Enhanced `admin/vite.config.js` - Added server and build configuration
✅ Created `.gitignore` - Proper project-level gitignore

## API Endpoints

### Products
- `GET /allproducts` - Get all products
- `GET /newcollections` - Get new collections
- `GET /popularinwomen` - Get popular women items
- `GET /bestsellers` - Get best selling products
- `POST /addproduct` - Add new product (admin)
- `POST /removeproduct` - Remove product (admin)
- `POST /upload` - Upload product image (admin)

### User Authentication
- `POST /signup` - Register new user
- `POST /login` - Login user

### Cart Management
- `POST /addtocart` - Add item to cart (requires auth)
- `POST /removefromcart` - Remove item from cart (requires auth)
- `POST /getcart` - Get user's cart (requires auth)

### Newsletter
- `POST /subscribe` - Subscribe to newsletter

## Database Models

### Product Schema
- `id`: Number
- `name`: String
- `image`: String
- `category`: String
- `new_price`: Number
- `old_price`: Number
- `date`: Date
- `available`: Boolean

### User Schema
- `name`: String
- `email`: String (unique)
- `password`: String
- `cartData`: Object
- `date`: Date

## Environment Variables

Create `.env` file in backend directory:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=*
```

## Development Notes

- All sensitive information is stored in `.env` files
- `.env` files are gitignored and never committed
- Use `.env.example` as a template for new environments
- Upload directory is gitignored to prevent committing user uploads
