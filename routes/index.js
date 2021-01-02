let router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');

var router = require("express").Router();

router.use('./api/technician', technicianRouter);

module.exports = router;
