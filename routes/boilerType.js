  
const boilerType = require("../controllers/boilerType");
let router = require("express").Router();

router.get("/", boilerType.findAll);
router.post("/", boilerType.create);
router.get("/:id", boilerType.findOne);
router.put("/:id", boilerType.update);
router.delete("/:id", boilerType.delete);
module.exports = router;