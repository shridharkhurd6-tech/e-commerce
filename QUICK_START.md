# Quick Start Guide - E-Commerce Application

## Prerequisites
- Node.js (v14 or higher)
- MongoDB account (Atlas or local)
- npm or yarn

## 1️⃣ Backend Setup

### Install Dependencies
```bash
cd backend
npm install
```

### Create .env File
Copy `.env.example` and create `.env`:
```bash
PORT=4000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/e-commerce
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=*
```

### Seed Database with Sample Products
```bash
npm run seed
```

### Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Backend will run on: **http://localhost:4000**

---

## 2️⃣ Frontend Setup

### Install Dependencies
```bash
cd frontend
npm install
```

### Optional: Create .env File
```bash
REACT_APP_API_URL=http://localhost:4000
```

### Start Frontend
```bash
npm start
```

Frontend will run on: **http://localhost:3000**

---

## 3️⃣ Admin Panel Setup

### Install Dependencies
```bash
cd admin
npm install
```

### Start Admin Panel
```bash
npm run dev
```

Admin will run on: **http://localhost:5173**

---

## ✅ Verification Checklist

- [ ] Backend is running on `http://localhost:4000`
- [ ] Check API endpoint: `http://localhost:4000/allproducts` (should return products)
- [ ] Frontend is running on `http://localhost:3000`
- [ ] Products display on the homepage
- [ ] Admin panel is running on `http://localhost:5173`

---

## 🔍 Troubleshooting

### Products Not Showing?
1. **Check backend is running**: `http://localhost:4000` should respond
2. **Verify database connection**: Check `.env` MongoDB URI
3. **Run seed script**: `npm run seed` in backend folder
4. **Check console logs**: Frontend and backend should show "✅ Products loaded"

### Port Already in Use?
```bash
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### CORS Issues?
Ensure `CORS_ORIGIN=*` in backend `.env` file

### MongoDB Connection Error?
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0)
- Ensure credentials are URL-encoded

---

## 📝 Important Files

- `backend/.env` - Backend configuration (keep secret!)
- `backend/seed.js` - Sample product seeder
- `frontend/src/config/api.js` - API endpoints configuration
- `admin/vite.config.js` - Vite configuration

---

## 🚀 Development Tips

1. **Use console.logs**: Both frontend and backend show `✅ Products loaded` when data fetches successfully
2. **Check Network tab**: Browser DevTools → Network tab to see API calls
3. **Seed regularly**: If DB gets corrupted, run `npm run seed` again
4. **Clear localStorage**: If having auth issues, clear browser storage

