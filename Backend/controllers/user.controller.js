const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.registerUser = async (req, res, next) => {
    console.log('inside the user controller')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const {fullname,email,password} = req.body;
    const   isuserAlreadyExist =  await userModel.findOne({email});
    
    if(isuserAlreadyExist)
    {
        return res.status(400).json({message: 'user already exist'});
    }
   
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });
    const token = user.generateAuthToken();

   const userObject = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
    };

    return res.status(201).json({ token, user: userObject });
}
module.exports.loginUser = async (req,res,next) => {
    console.log('conrol inside loginUser');
    const error = validationResult(req);
    if(!error.isEmpty)
    {   console.log('inside error')
        return res.status(400).json({errors : error.array() })
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    //important  password cant be fetched bydefault . we have to explicitly define it
    if(!user)
    {
        return res.status(401).json({message : 'password or email is not valid '});
    }
    const ismatch = await user.comparePassword(password);
    if(!ismatch)
    {
      return res.status(401).json({ message : 'invalid password'});  
    }
    const token  = user.generateAuthToken();
const userObject = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
    };

    res.cookie('token', token);
    res.status(200).json({ token, user: userObject });
};
module.exports.getUserProfile = async (req,res,next)=>{
    console.log('inside profile ')
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res)=>
{
    console.log('inside logout');
    res.clearCookie('token');
    const token = req.cookies.token||req.headers.authorization.split(' ')[ 1 ];
    await blacklistTokenModel.create({token});
    res.status(200).json({message : 'logged out'});
}
