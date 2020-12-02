const appointmentRouter = require("./appointment");
const boilerTypeRouter = require("./boilerType");
const technicianRouter = require("./technician");

const router = require("express").Router();

router.use("/appointment", appointmentRouter)
router.use("/boilerType", boilerTypeRouter)
router.use("/technicians", technicianRouter)


module.exports = router;