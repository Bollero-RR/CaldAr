const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = '';
db.technician = require("./technicians.js")(mongoose);

module.exports = db;
