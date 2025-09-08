# Migration Guide: Encore to Express Backend

This guide helps you migrate from the Encore backend to the new Express TypeScript backend.

## Overview

The new Express backend provides the same API endpoints as the original Encore backend, making it a drop-in replacement. All frontend functionality remains the same.

## What Changed

### Backend
- **Framework**: Encore → Express.js with TypeScript
- **Database**: Encore's built-in database → PostgreSQL with pg driver
- **Authentication**: Encore's auth system → JWT with bcrypt
- **Structure**: Encore services → Express routes and controllers

### Frontend
- **API Client**: Encore generated client → Custom Express API client
- **Configuration**: Encore environment → Vite environment variables

## Migration Steps

### 1. Setup New Backend

```bash
# Install dependencies
cd express-backend
npm install

# Configure environment
cp env.example .env
# Edit .env with your database and API keys
```

### 2. Database Setup

```bash
# Install PostgreSQL (if not already installed)
# Create database
createdb wifi_deauth_db

# The Express backend will automatically create tables on startup
```

### 3. Update Frontend Configuration

```bash
# Configure frontend environment
cd frontend
cp env.example .env
# Edit .env to point to Express backend (VITE_API_URL=http://localhost:3001)
```

### 4. Install Dependencies

```bash
# From project root
npm run install:all
```

### 5. Start the Application

```bash
# Development mode (both backend and frontend)
npm run dev

# Or start individually
npm run dev:backend  # Express backend on port 3001
npm run dev:frontend # React frontend on port 5173
```

## API Compatibility

All API endpoints remain the same:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/logout` | POST | User logout |
| `/auth/register` | POST | User registration |
| `/simulation/wifi-list` | GET | Get Wi-Fi networks |
| `/simulation/deauth` | POST | Simulate deauth attack |
| `/simulation/connected-devices` | GET | Get connected devices |
| `/passwords/strength` | POST | Check password strength |
| `/passwords/save` | POST | Save password |
| `/passwords/list` | POST | List saved passwords |
| `/news/feed` | GET | Get news feed |
| `/data/csv` | GET | Export CSV data |
| `/data/json` | GET | Export JSON data |
| `/me` | GET | Get user profile |
| `/me` | PATCH | Update user profile |
| `/system/device-info` | GET | Get device info |

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/wifi_deauth_db
JWT_SECRET=your-super-secret-jwt-key-here
NEWS_API_KEY=your-news-api-key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

## Key Differences

### Authentication
- **Before**: Encore's built-in session management
- **After**: JWT tokens with HTTP-only cookies

### Database
- **Before**: Encore's managed database
- **After**: PostgreSQL with manual connection management

### Error Handling
- **Before**: Encore's structured error responses
- **After**: Express middleware with similar error structure

### Development
- **Before**: `encore run`
- **After**: `npm run dev` (runs both backend and frontend)

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_ctl status

# Test connection
psql -d wifi_deauth_db -c "SELECT NOW();"
```

### Port Conflicts
- Backend: Change `PORT` in express-backend/.env
- Frontend: Change `VITE_API_URL` in frontend/.env

### CORS Issues
- Ensure `FRONTEND_URL` in backend .env matches your frontend URL
- Check that both servers are running on expected ports

## Benefits of Migration

1. **Simpler Architecture**: No Encore framework complexity
2. **Better Control**: Full control over Express.js middleware and routing
3. **Easier Deployment**: Standard Node.js deployment
4. **Better Development Experience**: Standard npm scripts and tooling
5. **TypeScript Support**: Full TypeScript support throughout
6. **Database Flexibility**: Can easily switch databases or add features

## Rollback Plan

If you need to rollback to Encore:
1. Keep the original `backend/` directory
2. Revert frontend changes to use `~backend/client`
3. Run `encore run` instead of `npm run dev`

The original Encore backend remains unchanged and functional.
