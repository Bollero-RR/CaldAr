const { route } = require('./appointment');//este no es necesario creo.
const appointmentRouter = require("./appointment")

var router = require("express").Router();

router.use("/appointment", appointmentRouter)

module.exports = router;