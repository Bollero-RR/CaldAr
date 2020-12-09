const express = require("express");
const router = express.Router();
const technicians = require("../data/technicians.json");
const idFilter = (req) => (technician) =>
  technician.id === parseInt(req.params.id);

// Get All Techinicians

router.get("/", (req, res) => res.json(technicians));

//Get a Single Techinician by ID

router.get("/:id", (req, res) => {
  const found = technicians.some(idFilter(req));

  if (found) {
    res.json(technicians.filter(idFilter(req)));
  } else {
    res
      .status(400)
      .json({ msg: `No technician with the id of ${req.params.id}` });
  }
});

//Get a Technician by Category

router.get("/lastName/:lastName", (req, res) => {
  const found = technicians.some(
    (technicians) => technicians.lastName === req.params.lastName
  );
  if (found) {
    res.json(
      technicians.filter(
        (technicians) => technicians.lastName === req.params.lastName
      )
    );
  } else {
    res.status(400).send({
      msg: `Technician not found with this Last Name: ${req.params.lastName}`,
    });
  }
});

// Delete technician
router.delete("/:id", (req, res) => {
  const found = technicians.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Technician deleted",
      technicians: technicians.filter(
        (technician) => !idFilter(req)(technician)
      ),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No technician with the id of ${req.params.id}` });
  }
});

module.exports = router;
