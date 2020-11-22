const express = require("express");
const router = express.Router();
const boilers = require("../data/boilers.json");

const idFilter = (req) => (boiler) => boiler.id === parseInt(req.params.id);

//Get all boilers
router.get("/", (req, res) => res.json(boilers));

//Get all single boiler
router.get("/:id", (req, res) => {
  const found = boilers.some(idFilter(req));

  if (found) {
    res.json(boilers.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//Delete boiler
router.delete("/:id", (req, res) => {
  const found = boilers.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Member deleted",
      boilers: boilers.filter((boiler) => !idFilter(req)(boiler)),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
