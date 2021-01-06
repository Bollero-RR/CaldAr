const boilers = require("../controllers/boilers");
let router = require("express").Router();
const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", authMiddleWare, boilers.findAll);
router.post("/", authMiddleWare, boilers.create);
router.get("/:id", authMiddleWare, boilers.findOne);
router.get("/type/:type", authMiddleWare, boilers.findOneType);
router.put("/:id", authMiddleWare, boilers.update);
router.delete("/:id", authMiddleWare, boilers.delete);

module.exports = router;
