const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

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
app.use('/api',userRoutes)


app.listen(process.env.PORT,()=>{
    console.log('Server is running...')
})