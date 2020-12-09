const router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');

router.use("/boilerType", boilerTypeRouter);
router.use("/customers", customerRouter);
router.use("/boilers", boilerRouter);
router.use('./technician', technicianRouter);

module.exports = router;
