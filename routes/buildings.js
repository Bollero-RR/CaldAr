const building = require("../controllers/buildings.js");
let router = require("express").Router();
//const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", building.findAll);
router.post("/", building.create);
router.get("/:id", building.findOne);
router.get("/phone/:phone", building.findOnePhone);
router.put("/:id", building.update);
router.delete("/:id", building.delete);

// router.get("/", authMiddleWare, building.findAll);
// router.post("/", authMiddleWare, building.create);
// router.get("/:id", authMiddleWare, building.findOne);
// router.get("/phone/:phone", authMiddleWare, building.findOnePhone);
// router.put("/:id", authMiddleWare, building.update);
// router.delete("/:id", authMiddleWare, building.delete);

module.exports = router;