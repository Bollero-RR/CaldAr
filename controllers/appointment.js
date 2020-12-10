const db = require("../models");
const Appointment = db.appointment;

const validateStartTimestamp = (res, start_timestamp) => {
  const lettersAmount = start_timestamp.length;
  if (lettersAmount < 5) {
    return res.status(400).send({
      message: "The Start Timestamp is not valid",
    });
  }
  return true;
};

const validateEndTimestamp = (res, end_timestamp) => {
  const lettersAmount = end_timestamp.length;
  if (lettersAmount < 5) {
    return res.status(400).send({
      message: "The End Timestamp is not valid",
    });
  }
  return true;
};

exports.create = (req, res) => {
  if (!req.body.buildingId || !req.body.boilerId || !req.body.start_timestamp || !req.body.end_timestamp) {
    return res.status(400).send({
      message: "Content cannot be empty any field!"
    })
  }

   const {
    buildingId,
    boilerId,
    start_timestamp,
    end_timestamp,
  } = req.body;

  validateStartTimestamp(res,start_timestamp);
  validateEndTimestamp(res,end_timestamp);

  const newAppointment = new Appointment({
    buildingId: buildingId,
    boilerId: boilerId,
    start_timestamp: start_timestamp,
    end_timestamp: end_timestamp
  });

  if (validateStartTimestamp(res,start_timestamp) && validateEndTimestamp(res,end_timestamp)) {
  newAppointment
    .save(newAppointment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creting the appointment"
      });
    });
  }
};

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

exports.findOne = (req, res) => {
  Appointment.findOne({
    _id: req.params.id
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

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data updated can not be empty!"
    });
  }

  if (!req.body.buildingId || !req.body.boilerId || !req.body.start_timestamp || !req.body.end_timestamp) {
    return res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const id = req.params.id;

  Appointment.findOneAndUpdate({
    _id:id
    }, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update appointment with the id: " ${id} ". Maybe the appointment was not found!`
        });
      } else res.send({
        message: `Appointment with the id: " ${id} " was update successfully.`
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the appointment with id: " + id
      });
    });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  
  Appointment.findOneAndRemove({
    _id:id
    }, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete appointment with the id: " ${id} ". Maybe the appointment was not found!`
        });
      } else res.send({
        message: `Appointment with the id: " ${id} " was deleted successfully.`
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error removing the Appointment with the id: " + id
      });
    });
}