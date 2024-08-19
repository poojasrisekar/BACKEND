const mongoose = require('mongoose');
const OwnerSchema = require('./owner.schema');
const OwnerModel = mongoose.model("owner", OwnerSchema);
module.exports = OwnerModel;