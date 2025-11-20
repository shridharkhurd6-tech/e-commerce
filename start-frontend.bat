@echo off
REM ========================================
REM E-Commerce Frontend Startup Script (Windows)
REM ========================================

title E-Commerce Frontend Application
echo.
echo ========================================
echo  E-COMMERCE FRONTEND APPLICATION
echo ========================================
echo.

REM Change to frontend directory
cd /d "%~dp0frontend" || (
    echo ERROR: Could not navigate to frontend directory
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

REM Start the frontend
echo.
echo Starting Frontend Application...
echo Frontend will run on http://localhost:3000
echo.
call npm start

pause
