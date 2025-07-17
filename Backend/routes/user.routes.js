const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const {body} = require("express-validator")
const { authUser } = require('../middleware/auth.middleware');


//here express validators are used for middleware
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)
//here express validator is used for middleware
router.post('/login',[
    body('email').isEmail().withMessage('invalid mail'),
    body('password').isLength({min:6}).withMessage('password must be greater then 6 ')
],
userController.loginUser)


//auth user is used for authentication
router.get('/profile',authUser,userController.getUserProfile)

//auth user is used for authentication
router.get('/logout',authUser,userController.logoutUser);
module.exports =  router ;
