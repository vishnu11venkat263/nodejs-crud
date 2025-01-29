var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    userId: String,
    userName: String,
    emailId: String,
    mobileNumber: Number,
    designation: String,
    active: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema);
