const appointment = require("../controllers/appointment");
var router = require("express").Router();

router.get("/", appointment.findAll);

router.post("/", appointment.create);

router.get("/:id", appointment.findOne);

router.get("/buildingId/:buildingId", appointment.findOneBuildingId);

router.put("/:id", appointment.update);

router.delete("/:id", appointment.delete);

module.exports = router;

