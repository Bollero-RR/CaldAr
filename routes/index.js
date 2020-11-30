const { route } = require('./boilerType');
const boilerTypeRouter = require("./boilerType")

let router = require("express").Router();

router.use("/boilerType", boilerTypeRouter)

module.exports = router;