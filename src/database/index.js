import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const url = {
  development: process.env.DATABASE_URL,
  production: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
};

const conn = new Pool({
  connectionString: url[env],
});

console.log('connection', conn);

export default conn;
