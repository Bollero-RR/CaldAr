const customer = require("../controllers/customer");
let router = require("express").Router();
//const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", customer.findAll)
    .post("/", customer.create)
    .get("/:id", customer.findOne)
    .get("/email/:email", customer.findOneEmail)
    .put("/:id", customer.update)
    .delete("/:id", customer.delete);

/* router.get("/", authMiddleWare, customer.findAll)
    .post("/", authMiddleWare, customer.create)
    .get("/:id", authMiddleWare, customer.findOne)
    .get("/email/:email", authMiddleWare, customer.findOneEmail)
    .put("/:id", authMiddleWare, customer.update)
    .delete("/:id", authMiddleWare, customer.delete); */

module.exports = router;
