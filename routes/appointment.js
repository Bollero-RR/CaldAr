const router = require("express").Router();
let appointment = require("../controllers/appointment");
const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", authMiddleWare, appointment.findAll);
router.post("/", authMiddleWare, appointment.create);
router.get("/:id", authMiddleWare, appointment.findOne);
router.get("/buildingId/:buildingId", authMiddleWare, appointment.findOneBuildingId);
router.put("/:id", authMiddleWare, appointment.update);
router.delete("/:id", authMiddleWare, appointment.delete);

module.exports = router;

