const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes')
const cookieparser = require('cookie-parser')
const rideRoutes = require('./routes/ride.routes')
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.get('/v1', (req, res) => {
    res.send("server running");
})
app.use('/users', (req, res, next) => {
    console.log(req.body)
    console.log('control reach here')
    next()
}, userRoutes);
app.use('/rides',(req,res,next)=>{
    console.log('inside ride')
    console.log(req.body);
    next();
},rideRoutes);
app.use('/captain', (req, res, next) => {
    console.log('inside captain route');
    console.log(req.data);
    console.log(req.query)
    next();
}, captainRoutes);
app.use('/maps',(req, res, next) => {
    console.log('inside map');
    console.log(req.query.input);
    next();
},mapsRoutes);
module.exports = app 
