import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


dotenv.config();
const URI = process.env.URI;

const client = new MongoClient(URI);

let db;

export async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            console.log('Conexion exitosa');
            db = client.db('api'); 
        } catch (error) {
            console.error('Error en la conexion', error);
            throw error;
        }
    }
    return db;
}