"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.testConnection = exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'wifi_deauth_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
const testConnection = async () => {
    try {
        const client = await exports.pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        console.log('✅ Database connection successful');
        return true;
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
};
exports.testConnection = testConnection;
const initializeDatabase = async () => {
    try {
        const client = await exports.pool.connect();
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMPTZ DEFAULT now(),
        locked_until TIMESTAMPTZ NULL
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT now(),
        expires_at TIMESTAMPTZ
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS saved_passwords (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        domain TEXT NOT NULL,
        ciphertext BYTEA NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS sim_wifi_scans (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        ssid TEXT,
        bssid TEXT,
        rssi INTEGER,
        channel INTEGER,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS sim_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        scan_id UUID REFERENCES sim_wifi_scans(id) ON DELETE CASCADE,
        type TEXT,
        payload JSONB,
        timestamp TIMESTAMPTZ DEFAULT now()
      );
    `);
        await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        action TEXT,
        meta JSONB,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
        await client.query(`
      CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
    `);
        await client.query(`
      CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
    `);
        await client.query(`
      CREATE INDEX IF NOT EXISTS pwd_user_idx ON saved_passwords(user_id);
    `);
        client.release();
        console.log('✅ Database tables initialized successfully');
    }
    catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=database.js.map