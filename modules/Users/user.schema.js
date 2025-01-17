const mongoose = require('mongoose');
const {
    Types
} = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true,
    },
    dob: {
        type:Date,
        required: false
    },
    payment:{
         type:Number,
         default:false
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

module.exports = UserSchema;