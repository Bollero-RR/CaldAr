const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;

//db.url = process.env.DB_URL;
db.url = "mongodb+srv://admin:radium2120@cluster0.58ub4.mongodb.net/caldar?retryWrites=true&w=majority"

db.boilerType = require("./boilerType")(mongoose);
db.customer = require("./customer")(mongoose);
db.boilers = require("./boiler")(mongoose);
db.technician = require('./technician')(mongoose);
db.building = require("./buildings.js")(mongoose);
db.appointment = require("./appointment")(mongoose);

module.exports = db;
