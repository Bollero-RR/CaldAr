const technician = require("../controllers/technician");
let router = require("express").Router();
//const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", technician.findAll)
    .post("/", technician.create)
    .get("/:id", technician.findOne)
    .get("/lastName/:lastName", technician.findOneLastName)
    .put("/:id", technician.update)
    .delete("/:id", technician.delete);

/* router.get("/", authMiddleWare, technician.findAll)
    .post("/", authMiddleWare, technician.create)
    .get("/:id", authMiddleWare, technician.findOne)
    .get("/lastName/:lastName", authMiddleWare, technician.findOneLastName)
    .put("/:id", authMiddleWare, technician.update)
    .delete("/:id", authMiddleWare, technician.delete);
 */
module.exports = router;



