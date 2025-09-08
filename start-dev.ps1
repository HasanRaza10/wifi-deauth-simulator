# Wi-Fi De-Authentication Simulator - Development Startup Script (PowerShell)

Write-Host "🚀 Starting Wi-Fi De-Authentication Simulator Development Environment" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is available: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm is available: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "express-backend/node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location "express-backend"
    npm install
    Set-Location ".."
}

if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location "frontend"
    npm install
    Set-Location ".."
}

# Check for environment files
if (-not (Test-Path "express-backend/.env")) {
    Write-Host "⚠️  Backend .env file not found. Creating from example..." -ForegroundColor Yellow
    Copy-Item "express-backend/env.example" "express-backend/.env"
    Write-Host "📝 Please edit express-backend/.env with your configuration" -ForegroundColor Cyan
}

if (-not (Test-Path "frontend/.env")) {
    Write-Host "⚠️  Frontend .env file not found. Creating from example..." -ForegroundColor Yellow
    Copy-Item "frontend/env.example" "frontend/.env"
    Write-Host "📝 Please edit frontend/.env with your configuration" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎯 Starting development servers..." -ForegroundColor Green
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start both servers concurrently
npm run dev
