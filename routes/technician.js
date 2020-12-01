const technician = require("../controllers/technician");
var router = require("express").Router();

//Retrive all technicians
//GET - http://localhost:2000/technician/
router.get("/", technician.findAll);

//Create a new technician
//POST - http://localhost:2000/technician/
router.post("/", technician.create);

//Retrive a single technician with id
//GET - http://localhost:2000/technician/1
router.get("/:id", technician.findOne);

//Retrive a single technician with lastName
//GET - http://localhost:2000/technician/lastName/11
router.get("/lastName/:lastName", technician.findOneLastName);

//Update a technician with id
//PUT - http://localhost:2000/technician/1
router.put("/:id", technician.update);

//Delete a technician with id
//DELETE - http://localhost:2000/technician/1
router.delete("/:id", technician.delete);
module.exports = router;



