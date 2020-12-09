const { route } = require("./customers");
const customerRouter = require("./customers");

router.use("/customers", customerRouter);

let router = require("express").Router();

router.use("/boilers", boilerRouter);

module.exports = router;
