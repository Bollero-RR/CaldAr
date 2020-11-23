
const express = require("express");

const router = express.Router();

const boilerType = require("../data/boilerType.json");

const idFilter = (req) => (boilerType) => boilerType.id === parseInt(req.params.id);


//Get all boiler types
router.get("/", (req, res) => res.json(boilerType));

//Get a single boiler type
router.get("/:id", (req, res) => {
  const found = boilerType.some(idFilter(req));

  if (found) {
    res.json(boilerType.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No boiler type with the id of ${req.params.id}` });
  }
});

//Delete boiler
router.delete("/:id", (req, res) => {
  const found = boilerType.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Boiler type deleted",
      boilerType: boilerType.filter((boilerType) => !idFilter(req)(boilerType)),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No boiler type with the id of ${req.params.id}` });
  }
});

module.exports = router;


