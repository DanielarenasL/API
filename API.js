import express from "express"
import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const TOKEN = process.env.TOKEN;


const app = express();
const port = parseInt(process.env.PORT) || 3000

const turso = createClient({
    url: URL,
    authToken: TOKEN,
});

app.get('/', async(req, res) => {
    try {
        const getdata = await turso.execute('SELECT * FROM Users');
        console.log(getdata);
        res.json({ data: getdata });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })