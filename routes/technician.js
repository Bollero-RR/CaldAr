const technician = require("../controllers/technician");
let router = require("express").Router();

router.get("/", technician.findAll);
router.post("/", technician.create);
router.get("/:id", technician.findOne);
router.get("/lastName/:lastName", technician.findOneLastName);
router.put("/:id", technician.update);
router.delete("/:id", technician.delete);

module.exports = router;