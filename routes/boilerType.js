const boilerType = require("../controllers/boilerType");
var router = require("express").Router();

router.get("/", boilerType.findAll);
router.post("/", boilerType.create);
router.get("/:type", boilerType.findOneType);
router.get("/:id", boilerType.findOneId);
router.put("/:id", boilerType.update);
router.delete("/:id", boilerType.delete);
module.exports = router;