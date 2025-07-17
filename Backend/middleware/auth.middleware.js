const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    console.log('inside auth middleware')
    console.log(req.cookies.token)
    console.log(req.headers.authorization?.split(' ')[ 1 ])
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    //const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    console.log(token);
    if (!token) {
        console.log('no token');
        return res.status(401).json({ message: 'Unauthorized' });
    }


    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        console.log('blacklisted');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        const user = await userModel.findById(decoded._id)
        console.log(user)
         if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user;

        return next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    console.log(req.query)
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    console.log(token)

    if (!token) {
        console.log("1");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        console.log("2");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}