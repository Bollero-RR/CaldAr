const appointment = require("../controllers/appointment");
var router = require("express").Router();

//IMP++ La logica de cada endpoint, se aloja en controladoras (controllers)

//Retrive all appointments
//GET - http://localhost:2000/appointment/
router.get("/", appointment.findAll);

//Create a new appointment
//POST - http://localhost:2000/appointment/
router.post("/", appointment.create);

//Retrive a single appointment with id
//GET - http://localhost:2000/appointment/1
router.get("/:id", appointment.findOne);

//Retrive a single appointment with buildingId
//GET - http://localhost:2000/appointment/buildingId/11
router.get("/buildingId/:buildingId", appointment.findOneBuildingId);

//Update a appointment with id
//PUT - http://localhost:2000/appointment/1
router.put("/:id", appointment.update);

//Delete a appointment with id
//DELETE - http://localhost:2000/appointment/1
router.delete("/:id", appointment.delete);

module.exports = router;

