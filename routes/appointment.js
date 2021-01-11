const router = require("express").Router();
let appointment = require("../controllers/appointment");
//const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", appointment.findAll)
    .post("/", appointment.create)
    .get("/:id", appointment.findOne)
    .get("/buildingId/:buildingId", appointment.findOneBuildingId)
    .put("/:id", appointment.update)
    .delete("/:id", appointment.delete);

/* router.get("/", authMiddleWare, appointment.findAll)
    .post("/", authMiddleWare, appointment.create)
    .get("/:id", authMiddleWare, appointment.findOne)
    .get("/buildingId/:buildingId", authMiddleWare, appointment.findOneBuildingId)
    .put("/:id", authMiddleWare, appointment.update)
    .delete("/:id", authMiddleWare, appointment.delete); */

module.exports = router;

