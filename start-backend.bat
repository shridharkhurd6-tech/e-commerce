@echo off
REM ========================================
REM E-Commerce Backend Startup Script (Windows)
REM ========================================

title E-Commerce Backend Server
echo.
echo ========================================
echo  E-COMMERCE BACKEND SERVER
echo ========================================
echo.

REM Change to backend directory
cd /d "%~dp0backend" || (
    echo ERROR: Could not navigate to backend directory
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)

REM Check if .env exists
if not exist ".env" (
    echo.
    echo WARNING: .env file not found!
    echo Please create .env file with the following content:
    echo.
    echo PORT=4000
    echo MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/e-commerce
    echo JWT_SECRET=your_secret_key
    echo NODE_ENV=development
    echo CORS_ORIGIN=*
    echo.
    echo Creating .env from .env.example...
    if exist ".env.example" (
        copy .env.example .env
    )
    echo.
)

REM Start the server
echo.
echo Starting Backend Server...
echo Server will run on http://localhost:4000
echo.
call npm run dev

pause
