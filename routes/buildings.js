const building = require("../controllers/buildings.js");

let router = require("express").Router();

//retrieve all buildings
router.get("/", building.findAll);

//create a new building
router.post("/", building.create);

//retriev a single building with id
router.get("/:id", building.findOne);

//retrieve a single building by phone
router.get("/phone/:phone", building.findOnePhone);

//update a building with id
router.put("/:id", building.update);

//delete a building with id
router.delete("/:id", building.delete);

module.exports = router;