const router = require("express").Router();
const boilerTypeRouter = require("./boilerType");
const customerRouter = require("./customers");
const boilerRouter = require("./boilers");
router.use("/boilerType", boilerTypeRouter);
router.use("/customers", customerRouter);
router.use("/boilers", boilerRouter);
module.exports = router;
