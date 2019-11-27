import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const url = {
  development: process.env.DATABASE_URL_DEVELOPMENT,
  production: process.env.DATABASE_URI,
  test: process.env.DATABASE_TEST_URL,
};

const conn = new Pool({
  connectionString: url[env],
});


export default conn;
