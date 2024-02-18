import express from "express";
import mongoose from "mongoose";
import connectDB from "./database/connectDB.js";
import router from "./router/router.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


connectDB();


app.use('/',router);



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`HTTPS Server listening on port ${PORT}`);
})