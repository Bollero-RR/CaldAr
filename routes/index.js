const { route } = require('./technicians');
const technicianRouter = require('/technicians');

var router = require("express").Router();

router.use('./technicians', technicianRouter);

module.exports = router;

