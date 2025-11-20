# E-Commerce Windows Server Management Script
# This script helps manage the e-commerce application on Windows

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('start-all', 'start-backend', 'start-frontend', 'start-admin', 'seed-db', 'stop-all', 'status', 'install')]
    [string]$Action,
    
    [string]$Port
)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $projectRoot "backend"
$frontendDir = Join-Path $projectRoot "frontend"
$adminDir = Join-Path $projectRoot "admin"

function Test-Port {
    param([int]$Port)
    
    try {
        $connection = New-Object System.Net.Sockets.TcpClient("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

function Start-Backend {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Starting Backend Server..." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    if (-not (Test-Path "$backendDir\node_modules")) {
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
        Push-Location $backendDir
        npm install
        Pop-Location
    }
    
    if (-not (Test-Path "$backendDir\.env")) {
        Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
        if (Test-Path "$backendDir\.env.example") {
            Copy-Item "$backendDir\.env.example" "$backendDir\.env"
        }
    }
    
    Write-Host "Backend will run on http://localhost:4000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd $backendDir && npm run dev" -WindowStyle Normal
}

function Start-Frontend {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Starting Frontend Application..." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    if (-not (Test-Path "$frontendDir\node_modules")) {
        Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
        Push-Location $frontendDir
        npm install
        Pop-Location
    }
    
    Write-Host "Frontend will run on http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd $frontendDir && npm start" -WindowStyle Normal
}

function Start-Admin {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Starting Admin Panel..." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    if (-not (Test-Path "$adminDir\node_modules")) {
        Write-Host "Installing admin dependencies..." -ForegroundColor Yellow
        Push-Location $adminDir
        npm install
        Pop-Location
    }
    
    Write-Host "Admin will run on http://localhost:5173" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd $adminDir && npm run dev" -WindowStyle Normal
}

function Start-All {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "E-COMMERCE APPLICATION SUITE" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Starting all services in separate windows..." -ForegroundColor Yellow
    Write-Host ""
    
    Start-Backend
    Start-Sleep -Seconds 3
    
    Start-Frontend
    Start-Sleep -Seconds 3
    
    Start-Admin
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "All services are starting!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "URLs:" -ForegroundColor Cyan
    Write-Host "  Backend:  http://localhost:4000" -ForegroundColor Yellow
    Write-Host "  Frontend: http://localhost:3000" -ForegroundColor Yellow
    Write-Host "  Admin:    http://localhost:5173" -ForegroundColor Yellow
    Write-Host ""
}

function Seed-Database {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Seeding Database..." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    if (-not (Test-Path "$backendDir\.env")) {
        Write-Host "ERROR: .env file not found!" -ForegroundColor Red
        Write-Host "Please run 'start-backend' first to create .env" -ForegroundColor Yellow
        return
    }
    
    Push-Location $backendDir
    Write-Host "Running seed script..." -ForegroundColor Yellow
    npm run seed
    Pop-Location
}

function Stop-All {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Stopping All Services..." -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    
    Write-Host "Stopping Node processes..." -ForegroundColor Yellow
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    
    Write-Host "All services stopped successfully!" -ForegroundColor Green
}

function Get-Status {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Service Status" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    $backendRunning = Test-Port 4000
    $frontendRunning = Test-Port 3000
    $adminRunning = Test-Port 5173
    
    Write-Host "Backend Server (Port 4000): " -NoNewline
    if ($backendRunning) {
        Write-Host "✓ Running" -ForegroundColor Green
    } else {
        Write-Host "✗ Stopped" -ForegroundColor Red
    }
    
    Write-Host "Frontend App (Port 3000):   " -NoNewline
    if ($frontendRunning) {
        Write-Host "✓ Running" -ForegroundColor Green
    } else {
        Write-Host "✗ Stopped" -ForegroundColor Red
    }
    
    Write-Host "Admin Panel (Port 5173):    " -NoNewline
    if ($adminRunning) {
        Write-Host "✓ Running" -ForegroundColor Green
    } else {
        Write-Host "✗ Stopped" -ForegroundColor Red
    }
    
    Write-Host ""
}

function Install-Dependencies {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Installing All Dependencies" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location $backendDir
    npm install
    Pop-Location
    
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location $frontendDir
    npm install
    Pop-Location
    
    Write-Host "Installing admin dependencies..." -ForegroundColor Yellow
    Push-Location $adminDir
    npm install
    Pop-Location
    
    Write-Host "All dependencies installed successfully!" -ForegroundColor Green
}

# Execute action
switch ($Action) {
    'start-all' { Start-All }
    'start-backend' { Start-Backend }
    'start-frontend' { Start-Frontend }
    'start-admin' { Start-Admin }
    'seed-db' { Seed-Database }
    'stop-all' { Stop-All }
    'status' { Get-Status }
    'install' { Install-Dependencies }
}
