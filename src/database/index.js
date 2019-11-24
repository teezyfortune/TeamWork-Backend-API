import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const url = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
};

const conn = new Pool({
  connectionString: url[env],
});

<<<<<<< HEAD

=======
>>>>>>> e80387d034197b521e714e6aec8bb60725d46af8
export default conn;
