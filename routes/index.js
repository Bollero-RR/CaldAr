let router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');
const buildingRouter = require('./buildings');
const appointmentRouter = require("./appointment");

router.use("/boilerType", boilerTypeRouter);
router.use("/api/customers", customerRouter);
router.use("api/boilers", boilerRouter);
router.use('/technician', technicianRouter);
router.use('/buildings', buildingRouter);
router.use("/appointment", appointmentRouter)

module.exports = router;
