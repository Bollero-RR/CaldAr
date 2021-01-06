const boilerType = require("../controllers/boilerType");
let router = require("express").Router();
const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", authMiddleWare, boilerType.findAll);
router.post("/", authMiddleWare, boilerType.create);
router.get("/type/:type", authMiddleWare, boilerType.findOneType);
router.get("/:id", authMiddleWare, boilerType.findOneId);
router.put("/:id", authMiddleWare, boilerType.update);
router.delete("/:id", authMiddleWare, boilerType.delete);

module.exports = router;
