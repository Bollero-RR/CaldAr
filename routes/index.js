const { route } = require('./technician');
const technicianRouter = require('./technician');

var router = require("express").Router();

router.use('./api/technician', technicianRouter);

module.exports = router;

