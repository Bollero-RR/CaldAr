const customer = require("../controllers/customer");
let router = require("express").Router();

router.get("/", customer.findAll);
router.post("/", customer.create);
router.get("/:id", customer.findOne);
router.get("/email/:email", customer.findOneEmail);
router.put("/:id", customer.update);
router.delete("/:id", customer.delete);
module.exports = router;