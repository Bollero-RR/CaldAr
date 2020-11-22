// const getAllAppointments = () => console.log("This is not a test");
// const getAppointmentById = () => console.log("This is not a test");
// const getAppointmentByAttribute = () => console.log("This is not a test");
// const deleteAppointmentById = () => console.log("This is not a test");

const express = require("express");
const router = express.Router();
const appointments = require("../data/appointment.json");

const idFilter = (req) => (appointment) => appointment.id === parseInt(req.params.id);

//Get all Appointments
router.get("/", (req, res) => res.json(appointments));

//Get all single appointment
router.get("/:id", (req, res) => {
  const found = appointments.some(idFilter(req));
  if (found) {
    res.json(appointments.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No appointment with the id of ${req.params.id}` });
  }
});

//Delete appointment
router.delete("/:id", (req, res) => {
  const found = appointments.some(idFilter(req));
  if (found) {
    res.json({
      msg: "appointment deleted",
      appointments: appointments.filter((appointment) => !idFilter(req)(appointment)),
    });
  } else {
    res.status(400).json({ msg: `No appointment with the id of ${req.params.id}` });
  }
});

module.exports = router;