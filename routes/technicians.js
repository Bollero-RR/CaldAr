const { route } = require("../controllers/technicians.js");
const technician = require ("../controllers/technicians.js");

var router = require("express").Router();

// Create a new technician
router.post("/", technician.create);

// Update a technician with id
router.put("/:id", technician.update);

// Delete a technician with id
router.delete("/:id", technician.delete);

// Retrieve all technicians 
router.get("/", technician.findAll);

// Retrieve a single technician with id
router.get("/:id", technician.findOne);

// Retriene a single techinician with Last Name Atributte
router.get("/:lastName", technician.findLastName);

module.exports = router;






