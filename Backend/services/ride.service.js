const ridemodel = require('../models/ride.model')
const mapService = require('./maps.service')
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');

    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log(distanceTime);
    const {distance,time}=distanceTime
    console.log(distance);
    const km =Math.round((distance/1000)+(distance%1000)*0.001)
    console.log(km);
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance / 1000) * perKmRate.auto) + ((distanceTime.duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance / 1000) * perKmRate.car) + ((distanceTime.duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance / 1000) * perKmRate.moto) + ((distanceTime.duration / 60) * perMinuteRate.moto))
    };
    console.log(fare);
    return {
        fare,km
    };
}


module.exports.createRide = async ({
    user,pickup,destination,vehicleType
 }) => {
    console.log("in create ride ")
    console.log(user);
    if(!user||!pickup||!destination||!vehicleType)
    {
        throw new Error('all fields requires')
    }

    const {fare,km} = await getFare(pickup,destination);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const ride =  await ridemodel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp
    })


    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await ridemodel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await ridemodel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await ridemodel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await ridemodel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await ridemodel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await ridemodel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })
    console.log("inside ride ended")
    console.log(ride);
    return ride;
}
module.exports.getFare = getFare;
