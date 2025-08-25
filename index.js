import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from './config/db.js';

import userRoute from './routes/userRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 3000;

dbConnect();

app.get('/',(req,res)=>{
    res.send('API is working')
})

app.use('/',userRoute);

app.listen(PORT,()=>{
    console.log('Server started at ',PORT);
})