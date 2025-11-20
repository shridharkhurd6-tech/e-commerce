@echo off
REM ========================================
REM E-Commerce Admin Panel Startup Script (Windows)
REM ========================================

title E-Commerce Admin Panel
echo.
echo ========================================
echo  E-COMMERCE ADMIN PANEL
echo ========================================
echo.

REM Change to admin directory
cd /d "%~dp0admin" || (
    echo ERROR: Could not navigate to admin directory
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

REM Start the admin panel
echo.
echo Starting Admin Panel...
echo Admin will run on http://localhost:5173
echo.
call npm run dev

pause
