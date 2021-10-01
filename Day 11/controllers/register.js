const User = require('../models/user');

const register = async(req , res)=>{
const{email,password} = req.body;
try{
    const alreadyExists = await User.findOne({
        where:{email}
    });
    if(alreadyExists){
        res.status(401).send("Email already Exists");
    }
}
    catch(err){
        console.error(err);
    }
}

module.exports = register;