const db = require("../models");
const Appointment = db.appointment;

//Create and save a new appointment
exports.create = (req, res) => {
  //Valdiate Request
  if (!req.body.id || !req.body.buildingId || !req.body.boilerId || !req.body.start_timestamp || !req.body.end_timestamp) {
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  //Create an Appointment
  const appointment = new Appointment({
    id: req.body.id,
    buildingId: req.body.buildingId,
    boilerId: req.body.boilerId,
    start_timestamp: req.body.start_timestamp,
    end_timestamp: req.body.end_timestamp
  });

  //Save appointments in the database
  appointment
    .save(appointment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creting the appointment"
      });
    });
};

//Retrieve all appointments from database
exports.findAll = (req, res) => {
  Appointment.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving appointments"
      });
    });
};

//Find a single appointment with the id
exports.findOne = (req, res) => {
  Appointment.findOne({
      id: req.params.id
    })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Appointment with id: " ${req.params.id} " was not found`
        })
      }
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving appointments"
      })
    })
};

//Get single appointment buildingId
exports.findOneBuildingId = (req, res) => {
  Appointment.findOne({
    buildingId: req.params.buildingId
    })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Appointment with buildingId: " ${req.params.buildingId} " was not found`
        })
      }
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving appointments"
      })
    })
};

//Update an Appointments by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: `Data updated can not be empty!`
    });
  }
  //Valdiate Request
  if (!req.body.id || !req.body.buildingId || !req.body.boilerId || !req.body.start_timestamp || !req.body.end_timestamp) {
    return res.status(400).send({
      message: `Content cannot be empty!`
    });
  }
  const id = req.params.id;

  Appointment.findOneAndUpdate({
      id
    }, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update appointment with the id: " ${id} ". Maybe the appointment was not found!`
        });
      } else res.send({
        message: "Appointment was update successfully."
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the appointment with id: " + id
      });
    });
}

//Delete an Appointment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Appointment.findOneAndRemove({
      id
    }, {
      useFindAndModify: false
    })
    .then(data =>
      res.send({
        message: `Appointment was removed successfully`
      })
    )
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error removing the Appointment with the id: " + id
      });
    });
};