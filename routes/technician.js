const technician = require("../controllers/technician");
<<<<<<< HEAD
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
=======
let router = require("express").Router();

router.get("/", technician.findAll);
router.post("/", technician.create);
router.get("/:id", technician.findOne);
router.get("/lastName/:lastName", technician.findOneLastName);
router.put("/:id", technician.update);
router.delete("/:id", technician.delete);

>>>>>>> 9d045be29d2b169dca26f1c9959e1d640f9a42a4
module.exports = router;



