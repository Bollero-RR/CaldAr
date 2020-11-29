const { route } = require('./buildings');
const buildingRouter = require('./buildings');

var router = require("express").Router();

router.use('/buildings', buildingRouter)

module.exports = router;