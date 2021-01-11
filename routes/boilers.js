const boilers = require("../controllers/boilers");
let router = require("express").Router();
//const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/", boilers.findAll)
    .post("/", boilers.create)
    .get("/:id", boilers.findOne)
    .get("/type/:type", boilers.findOneType)
    .put("/:id", boilers.update)
    .delete("/:id", boilers.delete);

/*  router.get("/", authMiddleWare, boilers.findAll)
    .post("/", authMiddleWare, boilers.create)
    .get("/:id", authMiddleWare, boilers.findOne)
    .get("/type/:type", authMiddleWare, boilers.findOneType)
    .put("/:id", authMiddleWare, boilers.update)
    .delete("/:id", authMiddleWare, boilers.delete); */

module.exports = router;
