const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;

db.url = 'mongodb+srv://admin:MqQs80dXetvVdWo4@cluster0.58ub4.mongodb.net/caldar?retryWrites=true&w=majority';

db.boilerType = require("./boilerType")(mongoose);
db.customer = require("./customer")(mongoose);
db.boilers = require("./boiler")(mongoose);
db.technician = require('./technician')(mongoose);
db.building = require("./buildings.js")(mongoose);

module.exports = db;
