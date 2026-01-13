import {Pool} from 'pg';
import {config} from 'dotenv';
config()

const client = new Pool({
    connectionString:process.env.PostgreSQL_URI
})

export default client;