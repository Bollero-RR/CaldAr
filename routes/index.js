const router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');
const buildingRouter = require('./buildings');

router.use("/boilerType", boilerTypeRouter);
router.use("/customers", customerRouter);
router.use("/boilers", boilerRouter);
router.use('./technician', technicianRouter);
router.use('/buildings', buildingRouter);

module.exports = router;
