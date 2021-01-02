const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
<<<<<<< HEAD

//db.url = process.env.DB_URL;
db.url = "mongodb+srv://admin:radium2120@cluster0.58ub4.mongodb.net/caldar?retryWrites=true&w=majority"

=======
db.url =
  "mongodb+srv://admin:MqQs80dXetvVdWo4@cluster0.58ub4.mongodb.net/caldar?retryWrites=true&w=majority";

db.boilerType = require("./boilerType")(mongoose);
db.customer = require("./customer")(mongoose);
db.boilers = require("./boiler")(mongoose);
>>>>>>> 1e6608b85d30855e19a63b164afd9b7efc10525e
db.technician = require('./technician')(mongoose);

module.exports = db;
