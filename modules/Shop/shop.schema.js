const mongoose = require('mongoose');
const {
    Types
} = require('mongoose');

const ShopSchema = mongoose.Schema({
    ShopName:{
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    TotalPrice: {
        type: Number,
        required: true,
    },
    MonthlyRent:{
        type:Number,
        required:true,
    },

    isSold: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    WhoseProperty:{
        type:String,
        required:true,
    }
}, {
    timestamps: true
})

module.exports = ShopSchema;