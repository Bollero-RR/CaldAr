const { route } = require('./boilerType');
const boilerTypeRouter = require("./boilerType")

var router = require("express").Router();

router.use("/boilerType", boilerTypeRouter)

module.exports = router;