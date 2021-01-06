const technician = require("../controllers/technician");
let router = require("express").Router();
const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", authMiddleWare, technician.findAll);
router.post("/", authMiddleWare, technician.create);
router.get("/:id", authMiddleWare, technician.findOne);
router.get("/lastName/:lastName", authMiddleWare, technician.findOneLastName);
router.put("/:id", authMiddleWare, technician.update);
router.delete("/:id", authMiddleWare, technician.delete);

module.exports = router;



