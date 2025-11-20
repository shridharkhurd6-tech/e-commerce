@echo off
REM ========================================
REM E-Commerce Database Seeding Script (Windows)
REM ========================================

title E-Commerce - Database Seeding
echo.
echo ========================================
echo  E-COMMERCE DATABASE SEEDING
echo ========================================
echo.

REM Change to backend directory
cd /d "%~dp0backend" || (
    echo ERROR: Could not navigate to backend directory
    pause
    exit /b 1
)

REM Check if .env exists
if not exist ".env" (
    echo ERROR: .env file not found in backend directory!
    echo Please create .env file first using start-backend.bat
    echo.
    pause
    exit /b 1
)

REM Run seed script
echo.
echo Seeding database with sample products...
echo.
call npm run seed

if errorlevel 1 (
    echo.
    echo ERROR: Database seeding failed!
    echo Please check your MongoDB connection in .env file
    echo.
) else (
    echo.
    echo SUCCESS: Database seeded successfully!
    echo.
)

pause
