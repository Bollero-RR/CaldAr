const boilerType = require("../controllers/boilerType");
let router = require("express").Router();
const authMiddleWare = require("../middleware/authMiddleWare");

//router.get("/", boilerType.findAll);
//router.post("/", boilerType.create);
//router.get("/type/:type", boilerType.findOneType);
//router.get("/:id", boilerType.findOneId);
//router.put("/:id", boilerType.update);
//router.delete("/:id", boilerType.delete);

router
    .get("/", authMiddleWare, boilerType.findAll)
    .post("/", authMiddleWare, boilerType.create)
    .get("/type/:type", authMiddleWare, boilerType.findOneType)
    .get("/:id", authMiddleWare, boilerType.findOneId)
    .put("/:id", authMiddleWare, boilerType.update)
    .delete("/:id", authMiddleWare, boilerType.delete);

module.exports = router;
