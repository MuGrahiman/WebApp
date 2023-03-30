require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')

//database connection 
connection();

//middlewares
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3005'], // Allow requests from a specific origin
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    credentials:true
  }));

//routes
app.use("/api/users",userRoutes);
app.use('/api/auth',authRoutes);

//port
const port = process.env.PORT ;
app.listen(port,()=>console.log(`Listening On Port ${port}...`))