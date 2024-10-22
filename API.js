import express from "express"
import { createClient } from "@libsql/client";
import mysql from 'mysql2/promise';

require('dotenv').config

const url = process.env.Url;
const token = process.env.Token;


const app = express();
const port = parseInt(process.env.PORT) || 3000

app.use(express.json());

const connection = await mysql.createConnection({
    
})