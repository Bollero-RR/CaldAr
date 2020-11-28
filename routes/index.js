const router = require('../controllers/buildings');
const { route } = require('./customers');
const customerRouter = require("./customers")

let router = require("express").Router();

router.use("./customers", customerRouter)

module.exports = router;