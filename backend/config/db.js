import {Pool} from 'pg';
import {config} from 'dotenv';
import {drizzle} from 'drizzle-orm/node-postgres';
config()

const pool = new Pool({
    connectionString:process.env.PostgreSQL_URI
})

export const db = drizzle(pool);

export default pool;