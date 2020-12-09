const { route } = require("./boilers");
const boilerRouter = require("./boilers");

let router = require("express").Router();

router.use("/boilers", boilerRouter);

module.exports = router;
