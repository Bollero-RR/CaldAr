const db = require("../models");
const Appointment = db.appointment;

//Validation Fields
  //Validate Id
  const validateId = (res, id) => {
    if (isNaN(id)) {
      return res.status(400).send({
        message: "Write a valid Id",
      });
    }
    return true;
  };
  //validate BuildingId
  const validateBuildingId = (res, buildingId) => {

    if (buildingId < 1 || buildingId > 100) {
      return res.status(400).send({
        message: "The building type does not exist!",
      });
    }
    return true;
  };
  //validate Boiler ID
  const validateBoilerId = (res, boilerId) => {

    if (boilerId < 1 || boilerId > 100) {
      return res.status(400).send({
        message: "The boiler type does not exist!",
      });
    }
    return true;
  };
  //validate Start Timestamp
  const validateStartTimestamp = (res, start_timestamp) => {
    const lettersAmount = start_timestamp.length;
    if (lettersAmount < 5) {
      return res.status(400).send({
        message: "The Start Timestamp is not valid",
      });
    }
    return true;
  };
    //validate End Timestamp
    const validateEndTimestamp = (res, end_timestamp) => {
      const lettersAmount = end_timestamp.length;
      if (lettersAmount < 5) {
        return res.status(400).send({
          message: "The End Timestamp is not valid",
        });
      }
      return true;
    };

//Create and save a new appointment
exports.create = (req, res) => {
  //Valdiate Request
  if (!req.body.id || !req.body.buildingId || !req.body.boilerId || !req.body.start_timestamp || !req.body.end_timestamp) {
    return res.status(400).send({
      message: "Content cannot be empty any field!"
    })
  }
   //validate request
   const {
    id,
    buildingId,
    boilerId,
    start_timestamp,
    end_timestamp,
  } = req.body;

  validateId (res,id);
  validateBuildingId(res,buildingId);
  validateBoilerId(res,boilerId);
  validateStartTimestamp(res,start_timestamp);
  validateEndTimestamp(res,end_timestamp);

  //Create an Appointment
  const newAppointment = new Appointment({
    id: id,
    buildingId: buildingId,
    boilerId: boilerId,
    start_timestamp: start_timestamp,
    end_timestamp: end_timestamp
  });

  //Save appointments in the database
  if(validateId (res,id) && validateBuildingId(res,buildingId) &&  validateBoilerId(res,boilerId) && validateStartTimestamp(res,start_timestamp) && validateEndTimestamp(res,end_timestamp)){
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
      message: "Data updated can not be empty!"
    });
  }
  //Valdiate Request
  if (!req.body.id || !req.body.buildingId || !req.body.boilerId || !req.body.start_timestamp || !req.body.end_timestamp) {
    return res.status(400).send({
      message: "Content cannot be empty!"
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
        message: `Appointment with the id: " ${id} " was update successfully.`
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