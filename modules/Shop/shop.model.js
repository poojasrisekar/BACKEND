const mongoose = require('mongoose');
const ShopSchema = require('./shop.schema');
const shopModel = mongoose.model("shop", shopSchema);
module.exports = ShopModel;
