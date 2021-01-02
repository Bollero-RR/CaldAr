const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;

//db.url = process.env.DB_URL;
db.url = "mongodb+srv://admin:radium2120@cluster0.58ub4.mongodb.net/caldar?retryWrites=true&w=majority"

db.technician = require('./technician')(mongoose);

module.exports = db;
