import pg from 'pg';
import env from 'dotenv';

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
});
db.connect();

// db.on('error', (err) => {
//     console.error('Unexpected error or idle client', err);
//     process.exit(-1)
// })

export const query = (text,params) => db.query(text,params);