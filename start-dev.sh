#!/bin/bash

# Wi-Fi De-Authentication Simulator - Development Startup Script

echo "🚀 Starting Wi-Fi De-Authentication Simulator Development Environment"
echo "=================================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "express-backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd express-backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Check for environment files
if [ ! -f "express-backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating from example..."
    cp express-backend/env.example express-backend/.env
    echo "📝 Please edit express-backend/.env with your configuration"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Frontend .env file not found. Creating from example..."
    cp frontend/env.example frontend/.env
    echo "📝 Please edit frontend/.env with your configuration"
fi

echo ""
echo "🎯 Starting development servers..."
echo "   Backend:  http://localhost:3001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers concurrently
npm run dev
