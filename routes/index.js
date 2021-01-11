let router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');
const buildingRouter = require('./buildings');
const appointmentRouter = require("./appointment");

router.use("/api/boilerType", boilerTypeRouter)
    .use("/api/customers", customerRouter)
    .use("/api/boilers", boilerRouter)
    .use('/api/technician', technicianRouter)
    .use('/api/buildings', buildingRouter)
    .use("/api/appointment", appointmentRouter);

module.exports = router;
