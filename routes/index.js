let router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');
const buildingRouter = require('./buildings');
const appointmentRouter = require("./appointment");

router.use("/api/boilerType", boilerTypeRouter);
router.use("/api/customers", customerRouter);
router.use("/api/boilers", boilerRouter);
router.use('/api/technician', technicianRouter);
router.use('/api/buildings', buildingRouter);
router.use("/api/appointment", appointmentRouter)

module.exports = router;
