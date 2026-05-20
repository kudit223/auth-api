const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to DB');
}).catch((error)=>{
    console.log(error);
})


//middleware
app.use(express.json());



app.listen(process.env.PORT,()=>{
    console.log('Server is running...')
})