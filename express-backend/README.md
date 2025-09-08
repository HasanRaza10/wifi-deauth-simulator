# Wi-Fi De-Authentication Simulator - Express Backend

A simple Express.js TypeScript backend that replaces the Encore backend for the Wi-Fi De-Authentication Simulator application.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Wi-Fi Simulation**: Mock Wi-Fi network scanning and deauthentication attacks
- **Password Security**: Password strength checking and encrypted password vault
- **News Integration**: Cybersecurity news feed with NewsAPI integration
- **Data Export**: CSV and JSON export functionality
- **User Management**: Profile management and session handling

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout  
- `POST /auth/register` - User registration

### Simulation
- `GET /simulation/wifi-list` - Get available Wi-Fi networks
- `POST /simulation/deauth` - Simulate deauthentication attack
- `GET /simulation/connected-devices` - Get connected devices

### Password Security
- `POST /passwords/strength` - Check password strength
- `POST /passwords/save` - Save password to vault (authenticated)
- `POST /passwords/list` - List saved passwords (authenticated)

### News
- `GET /news/feed` - Get cybersecurity news feed

### Data Export
- `GET /data/csv` - Export simulation data as CSV
- `GET /data/json` - Export simulation data as JSON

### Profile
- `GET /me` - Get user profile (authenticated)
- `PATCH /me` - Update user profile (authenticated)

### System
- `GET /system/device-info` - Get device information

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Copy `env.example` to `.env` and configure:
   ```bash
   cp env.example .env
   ```

   Required environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `NEWS_API_KEY` - NewsAPI key for news feed
   - `PORT` - Server port (default: 3001)
   - `FRONTEND_URL` - Frontend URL for CORS

3. **Database Setup**:
   - Install PostgreSQL
   - Create database: `wifi_deauth_db`
   - The application will automatically create tables on startup

4. **Run the application**:
   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

## Database Schema

The application uses PostgreSQL with the following tables:
- `users` - User accounts
- `sessions` - User sessions
- `saved_passwords` - Encrypted password vault
- `sim_wifi_scans` - Wi-Fi scan history
- `sim_events` - Simulation events
- `audit_logs` - Security audit logs

## Security Features

- JWT-based authentication
- bcrypt password hashing
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection

## Development

- **TypeScript**: Full TypeScript support with strict type checking
- **ESLint**: Code linting and formatting
- **Hot Reload**: Development server with automatic reloading
- **Error Handling**: Comprehensive error handling middleware

## Migration from Encore

This Express backend provides the same API endpoints as the original Encore backend, making it a drop-in replacement. The frontend can be updated to point to this new backend without any changes to the API calls.
