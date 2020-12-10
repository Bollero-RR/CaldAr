const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;

db.url = process.env.DB_URL;

db.boilerType = require("./boilerType")(mongoose);
db.customer = require("./customer")(mongoose);
db.boilers = require("./boiler")(mongoose);
db.technician = require('./technician')(mongoose);
db.building = require("./buildings.js")(mongoose);
db.appointment = require("./appointment")(mongoose);

module.exports = db;
