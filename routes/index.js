const { route } = require('./buildings');
const buildingRouter = require('./buildings');

let router = require("express").Router();

router.use('/buildings', buildingRouter)

module.exports = router;