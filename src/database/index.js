import { Pool } from 'pg';

const conn = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = conn;
