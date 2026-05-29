const users = require('../models/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser= async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name||!email||!password) {
           return res.status(400).json({
                success:false,
                message:'All fields required!'
            })
        }
        const isEamilidExists = await users.findOne({email:email});
        if(isEamilidExists){
            return res.status(200).json({
                success:true,
                message:'This email id is already exists!'
            })
        }

        const userDetails = await users.create({
            name,
            email,
            password,
        });

        res.status(202).json({
            success:true,
            message:'User Created Successfully!!',
            data:userDetails
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:'Internal server error!!'
        })
    }
}

exports.loginUser = async (req,res)=>{
    try{

        const {email,password} = req.body;

        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:'All fields required!!'
            });
        }
        
        const userDetails = await users.findOne({email:email});

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'Email id is not exists!!'
            })
        }

        const isPasswordValid = await bcrypt.compare(password,userDetails.password);

        if(!isPasswordValid){
            return res.status(404).json({
                success:false,
                message:'Please enter the valid password!!'
            })
        }
        const token = jwt.sign({
            userId:userDetails._id,
            name:userDetails.name,
            role:userDetails.role
        },process.env.JWT_SECRET,{expiresIn:'2d'})


        res.status(200).json({
            success:true,
            message:'Login Successfully!!',
            token:token
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:'Internal server error!!'
        })
    }
}

exports.getAllUsers = async (req,res)=>{

    try{
        const allUsers = await users.find();
        
        res.status(200).json({
            users:allUsers
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Internal server error!!'
        })
    }


}