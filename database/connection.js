const mongoose = require("mongoose");
async function initialize_mongo_connectivity() {
    const URL = process.env.NODE_ENV === "DEVELOPMENT" ? "mongodb://poojasri:*****@localhost:27017/?directConnection=true&authSource=localhost%3A27017": PROD_DB_URL;
    try {
        await mongoose.connect(URL, {
            dbName: process.env.PROD_DB_NAME
        });
        console.log("Mongo Db connectivity success");
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    initialize_mongo_connectivity
};