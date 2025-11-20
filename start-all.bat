@echo off
REM ========================================
REM E-Commerce Complete Startup (All Services)
REM ========================================

title E-Commerce Application Suite
color 0A
cls
echo.
echo ========================================
echo  E-COMMERCE APPLICATION SUITE
echo ========================================
echo.
echo This script will start all services in separate windows:
echo   - Backend Server (Port 4000)
echo   - Frontend Application (Port 3000)
echo   - Admin Panel (Port 5173)
echo.
echo ========================================
echo.

REM Get the directory where this script is located
set PROJECT_ROOT=%~dp0

echo Starting Backend Server...
start "E-Commerce Backend" cmd /k "cd /d %PROJECT_ROOT% && call start-backend.bat"
timeout /t 3 /nobreak

echo Starting Frontend Application...
start "E-Commerce Frontend" cmd /k "cd /d %PROJECT_ROOT% && call start-frontend.bat"
timeout /t 3 /nobreak

echo Starting Admin Panel...
start "E-Commerce Admin" cmd /k "cd /d %PROJECT_ROOT% && call start-admin.bat"
timeout /t 2 /nobreak

echo.
echo ========================================
echo All services are starting in separate windows
echo ========================================
echo.
echo URLs:
echo   Backend:  http://localhost:4000
echo   Frontend: http://localhost:3000
echo   Admin:    http://localhost:5173
echo.
echo Note: First time startup may take a few minutes while dependencies are installed.
echo.
pause
