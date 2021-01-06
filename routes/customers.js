const customer = require("../controllers/customer");
let router = require("express").Router();
const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", authMiddleWare, customer.findAll);
router.post("/", authMiddleWare, customer.create);
router.get("/:id", customer.findOne);
router.get("/email/:email", authMiddleWare, customer.findOneEmail);
router.put("/:id", authMiddleWare, customer.update);
router.delete("/:id", authMiddleWare, customer.delete);

module.exports = router;
