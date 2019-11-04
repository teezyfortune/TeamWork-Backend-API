import { Client } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const config = new Client(connectionString, (err, client) => {
  if (err) {
    return err;
  }
  return client;
});
export default config;
