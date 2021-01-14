const boilers = require("../controllers/boilers");
let router = require("express").Router();

router.get("/", boilers.findAll);
router.post("/", boilers.create);
router.get("/:id", boilers.findOne);
router.get("/type/:type", boilers.findOneType);
router.put("/:id", boilers.update);
router.delete("/:id", boilers.delete);

module.exports = router;