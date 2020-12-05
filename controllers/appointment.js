// DECLARATE CONST
const express = require("express");
const router = express.Router();
const appointments = require("../data/appointment.json");
const idFilter = (req) => (appointment) =>
  appointment.id === parseInt(req.params.id);

//GET ALL APPOINTMENTS
router.get("/", (req, res) => {
  res.json(appointments);
});

//GET A SINGLE APPOINTMENTS BY ID
router.get("/:id", (req, res) => {
  const found = appointments.some(idFilter(req));
  if (found) {
    res.json(appointments.filter(idFilter(req)));
  } else {
    res
      .status(400)
      .json({ msg: `No appointment with the id of ${req.params.id}` });
  }
});

//GET A SINGLE APPOINTMENTS BY ATTRIBUTE
router.get("/buildingId/:buildingId", (req, res) => {
  const found = appointments.some(
    (appointment) => appointment.buildingId === parseInt(req.params.buildingId)
  );
  if (found) {
    res.json(
      appointments.filter(
        (appointment) =>
          appointment.buildingId === parseInt(req.params.buildingId)
      )
    );
  } else {
    res
      .status(400)
      .send({
        msg: `Appointments not found with this BuildingId: ${req.params.buildingId}`,
      });
  }
});

//DELETE APPOINTMENT
router.delete("/:id", (req, res) => {
  const found = appointments.some(
    (appointment) => appointment.id === parseInt(req.params.id)
  );
  if (found) {
    res.json({
      msg: "Appointment Deleted",
      appointments: appointments.filter(
        (appointment) => appointment.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No appointment with the id of ${req.params.id}` });
  }
});

module.exports = router;
