const bcrypt = require('bcrypt');

exports.authHash = async (req,res,next)=>{
    const {password} = req.body;

    if(!password){
        return res.status(400).json({
            success:false,
            message:'All fields required!'
        });
    }

    const hashPassword = await bcrypt.hash(password,Number(process.env.BCRYPT_SALTS));
    req.body.password = hashPassword;
    next();
}