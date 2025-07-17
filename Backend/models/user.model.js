const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Defining the schema
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be of length 3'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be of length 3'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email length must be at least 5'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
    },
    socketId: {
        type: String,
    },
});

// Method to generate Auth Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Static method to hash the password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Create the model from the schema
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
