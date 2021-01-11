const building = require("../controllers/buildings.js");
let router = require("express").Router();
//const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", building.findAll)
    .post("/", building.create)
    .get("/:id", building.findOne)
    .get("/phone/:phone", building.findOnePhone)
    .put("/:id", building.update)
    .delete("/:id", building.delete);

/* router.get("/", authMiddleWare, building.findAll)
    .post("/", authMiddleWare, building.create)
    .get("/:id", authMiddleWare, building.findOne)
    .get("/phone/:phone", authMiddleWare, building.findOnePhone)
    .put("/:id", authMiddleWare, building.update)
    .delete("/:id", authMiddleWare, building.delete); */

module.exports = router;