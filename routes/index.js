const { route } = require('./technician');
const technicianRouter = require('./technician');

var router = require("express").Router();

router.use('./technician', technicianRouter);

module.exports = router;

