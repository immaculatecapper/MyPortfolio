import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// Always load the .env file from the project root (MyPortfolio/.env),
// even when the server is started from inside the client folder.
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

// Central app configuration. Real values live in the .env file (see .env.example)
// so the database password is never committed to GitHub.
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/Portfolio',
}

export default config
