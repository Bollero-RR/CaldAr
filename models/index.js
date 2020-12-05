const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url =
  "mongodb+srv://admin:MqQs80dXetvVdWo4@cluster0.58ub4.mongodb.net/caldar?retryWrites=true&w=majority";
db.customer = require("./customer")(mongoose);

module.exports = db;
