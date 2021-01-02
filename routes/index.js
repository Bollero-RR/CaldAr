const router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
const technicianRouter = require('./technician');

<<<<<<< HEAD
var router = require("express").Router();

router.use('./api/technician', technicianRouter);
=======
router.use("/boilerType", boilerTypeRouter);
router.use("/customers", customerRouter);
router.use("/boilers", boilerRouter);
router.use('./technician', technicianRouter);
>>>>>>> 1e6608b85d30855e19a63b164afd9b7efc10525e

module.exports = router;
