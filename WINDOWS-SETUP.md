# E-Commerce Application - Windows Setup Guide

## 🪟 Windows Installation & Setup

### System Requirements
- Windows 10/11 or Windows Server 2016+
- Node.js v14+ (https://nodejs.org/)
- MongoDB account (Atlas or local installation)
- Administrator privileges for IIS deployment (optional)

---

## ⚡ Quick Start (Windows)

### Option 1: Using Batch Files (Easiest)

1. **Start All Services at Once**
   - Double-click: `start-all.bat`
   - This opens 3 command windows for Backend, Frontend, and Admin

2. **Or Start Individually**
   - Backend: Double-click `start-backend.bat`
   - Frontend: Double-click `start-frontend.bat`
   - Admin: Double-click `start-admin.bat`

3. **Seed Database**
   - Double-click: `seed-database.bat`

### Option 2: Using PowerShell (Advanced)

```powershell
# Open PowerShell as Administrator, then:

# Start all services
.\manage.ps1 -Action start-all

# Start individual services
.\manage.ps1 -Action start-backend
.\manage.ps1 -Action start-frontend
.\manage.ps1 -Action start-admin

# Seed database
.\manage.ps1 -Action seed-db

# Check service status
.\manage.ps1 -Action status

# Stop all services
.\manage.ps1 -Action stop-all

# Install all dependencies
.\manage.ps1 -Action install
```

### Option 3: Manual Command Line

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm start

# Admin (in another terminal)
cd admin
npm install
npm run dev

# Seed database (in backend terminal)
npm run seed
```

---

## 📋 Configuration Files

### Backend Configuration (`.env`)

Create or edit `backend\.env`:

```bash
PORT=4000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/e-commerce
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=*
```

**Production (.env.production):**
```bash
PORT=4000
MONGODB_URI=your_production_mongodb_url
JWT_SECRET=strong_production_secret_key
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com,https://admin.yourdomain.com
```

### Frontend Configuration (Optional `.env`)

Create `frontend\.env`:
```bash
REACT_APP_API_URL=http://localhost:4000
```

---

## 🌐 Access URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:4000 | 4000 |
| Admin Panel | http://localhost:5173 | 5173 |

---

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Whitelist IP: 0.0.0.0/0 (or your IP)
6. Add to `backend\.env` as `MONGODB_URI`

### MongoDB Local Installation

1. Download from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Use connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/e-commerce
   ```

### Seed Sample Data

Run seed script to populate database with sample products:

**Using batch file:**
```bash
Double-click: seed-database.bat
```

**Using PowerShell:**
```powershell
.\manage.ps1 -Action seed-db
```

**Manual:**
```bash
cd backend
npm run seed
```

---

## 🚀 Deployment on Windows IIS

### Prerequisites
- Windows Server 2016+ with IIS installed
- Node.js installed on server
- MongoDB accessible from server

### Step 1: Build Frontend

```bash
cd frontend
npm run build
```

This creates a `frontend\build` directory.

### Step 2: Create IIS Sites

**For Frontend:**
1. Open IIS Manager
2. Right-click "Sites" → "Add Website"
3. Name: `ecommerce-frontend`
4. Path: `C:\path\to\frontend\build`
5. Binding: `yourdomain.com` (Port 80)
6. Check `web.config` exists in build folder

**For Admin:**
1. Right-click "Sites" → "Add Website"
2. Name: `ecommerce-admin`
3. Path: `C:\path\to\admin\dist`
4. Binding: `admin.yourdomain.com` (Port 80)
5. Check `web.config` exists in dist folder

### Step 3: Setup Backend as Windows Service

Install Node.js application as Windows Service using NSSM:

```powershell
# Download NSSM from https://nssm.cc/download

# Install service
nssm install ecommerce-backend "C:\Program Files\nodejs\node.exe" "C:\path\to\backend\index.js"

# Set working directory
nssm set ecommerce-backend AppDirectory C:\path\to\backend

# Set environment
nssm set ecommerce-backend AppEnvironmentExtra NODE_ENV=production

# Start service
net start ecommerce-backend

# Check status
nssm status ecommerce-backend
```

---

## 🔧 Troubleshooting

### Port Already in Use

**Find process using port:**
```powershell
netstat -ano | findstr :4000
```

**Kill process:**
```powershell
taskkill /PID <PID> /F
```

### npm Not Found

- Ensure Node.js is installed: `node --version`
- Add Node.js to PATH and restart terminal
- Or use full path: `C:\Program Files\nodejs\npm`

### MongoDB Connection Error

1. Check connection string in `.env`
2. Verify MongoDB is running (for local): `mongod`
3. Whitelist your IP in MongoDB Atlas
4. Test connection: `mongo "mongodb+srv://..."`

### Products Not Showing

1. Check backend is running: http://localhost:4000
2. Run seed script: `seed-database.bat`
3. Check console for errors
4. Verify API URL is correct in frontend `.env`

### CORS Errors

Update `backend\.env`:
```bash
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

---

## 📝 Important Files

| File | Purpose |
|------|---------|
| `start-all.bat` | Start all services |
| `start-backend.bat` | Start backend only |
| `start-frontend.bat` | Start frontend only |
| `start-admin.bat` | Start admin only |
| `seed-database.bat` | Seed products to DB |
| `manage.ps1` | PowerShell management script |
| `backend\.env` | Backend configuration |
| `frontend\web.config` | IIS configuration for frontend |
| `admin\web.config` | IIS configuration for admin |

---

## 🔒 Security Notes

- Never commit `.env` files to git
- Use strong `JWT_SECRET` in production
- Enable HTTPS in production
- Restrict `CORS_ORIGIN` to your domain only
- Use environment-specific configuration files
- Keep Node.js and npm updated

---

## 📞 Development Tips

1. **Keep terminals open:** Each service runs in its own terminal
2. **Check logs:** Console shows errors and logs for debugging
3. **Use DevTools:** Browser F12 → Console for frontend errors
4. **Restart services:** Close terminal and restart batch file if changes made
5. **Clear cache:** Ctrl+Shift+Delete in browser to clear cache

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:4000
- [ ] API responds: http://localhost:4000/allproducts
- [ ] Frontend running on http://localhost:3000
- [ ] Products display on homepage
- [ ] Can add items to cart
- [ ] Admin panel running on http://localhost:5173
- [ ] Database connected and populated

---

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Check terminal output for backend errors
3. Verify MongoDB connection in `.env`
4. Run seed script again: `seed-database.bat`
5. Check firewall isn't blocking ports
6. Ensure Node.js is properly installed
