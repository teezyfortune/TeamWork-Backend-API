import { Pool } from 'pg';

const conn = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default conn;
