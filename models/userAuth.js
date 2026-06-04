const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"Email allready exists"],
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid formate!!"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,"Invalid password formate"]
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

const users = mongoose.model('users',userSchema);

module.exports = users;