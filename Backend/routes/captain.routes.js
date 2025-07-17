const express = require('express');
const router =  express.Router();
const {body} =  require('express-validator')
const captainController = require('../controllers/captain.controller');
const authmiddleware = require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be 3 charaters long '),
    body('password').isLength({min:6}).withMessage('password must be  6 charaaters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be 3 charaters long '),
    body('vehicle.plate').isLength({min:3}).withMessage('number plate must be 3 charaters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be atleast greater than 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle type')
],captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({min : 6}).withMessage('password must be at 6 character long')
],captainController.loginCaptain)

router.get('/profile',authmiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authmiddleware.authCaptain,captainController.logoutCaptain)
module.exports = router;