const mongoose = require('mongoose');
const PropertySchema = require('./property.schema');
const PropertyModel = mongoose.model("property", propertySchema);
module.exports = PropertyModel;
