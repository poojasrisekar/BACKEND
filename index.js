const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const {
    initialize_mongo_connectivity
} = require('./database/connection');
require('dotenv').config();
const server = express();
server.use(cors());

const config = {
    port: 3000,
    host: 'localhost'
};
server.use(parser.json());
server.use('/Owner', require('./modules/Owner/owner.controller'));
server.use('/shop', require('./modules/Shops/shop.controller'));
server.use('/property', require('./modules/Property/property.controller'));
server.use('/api/auth', require('./modules/authentication/authentication.controller.js'));
server.use('/api/auth/admin', require('./modules/authentication/authentication.frontend.controller.js'));
server.use('/api/users/', require('./modules/users/users.controller.js'));


server.listen(config.port, config.host, () => {
    initialize_mongo_connectivity();
    console.log(`Server started successfully http://${config.host}:${config.port} `)
});