const building = require("../controllers/buildings.js");
let router = require("express").Router();

router.get("/", building.findAll);
router.post("/", building.create);
router.get("/:id", building.findOne);
router.get("/phone/:phone", building.findOnePhone);
router.put("/:id", building.update);
router.delete("/:id", building.delete);

module.exports = router;