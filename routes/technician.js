const technician = require("../controllers/technician");
var router = require("express").Router();

//Retrive all technicians
router.get("/", technician.findAll);

//Create a new technician
router.post("/", technician.create);

//Retrive a single technician with id
router.get("/:id", technician.findOne);

//Retrive a single technician with lastName
router.get("/lastName/:lastName", technician.findOneLastName);

//Update a technician with id
router.put("/:id", technician.update);

//Delete a technician with id
router.delete("/:id", technician.delete);
module.exports = router;



