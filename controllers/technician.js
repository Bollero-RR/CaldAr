const e = require("express");
const db = require("../models");
const Technician = db.technician;
const errEmail = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

const validateFirstName = (firstName, res)=> {
  if (firstName.length < 3) {
    return res.status(400).send({
      message: `The first name must contain at least 3 letters`,
    });
  }
  return true;
};

const validateLastName = (lastName, res) => {
  if (lastName.length < 3) {
    return res.status(400).send({
      message: `The last name must contain at least 3 letters`,
    });
  }
  return true;
};

const validateEmail = (email, res) => {
  if (!errEmail.test(email.value)) {
    return res.status(400).send({
      message: `Email error. Please enter a valid email`,
    });
  }
  return true;
};

const validateHour_Rate = (hour_rate, res) => {
  if (hour_rate < 0 || hour_rate > 50) {
    return res.status(400).send({
      message: `The hour rate is invalid. Please enter a number between 0 - 50`,
    });
  }
  return true;
};

const validateDaily_Capacity = (daily_capacity, res) => {
  if (daily_capacity < 0 || daily_capacity > 8) {
    return res.status(400).send({
      message: `The daily capacity is invalid. Please enter a number between 0 - 8`,
    });
  }
  return true;
};

  // Retrieve all technicians
  exports.findAll = (req, res) => {
    Technician.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving technicians"
        });
      });
  };

  // Create a new technician
  exports.create = (req, res) => {

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.hour_rate || !req.body.daily_capacity) {
      return res.status(400).send({
        message: `Content cannot be empty!`
      })
    }

    const {
      firstName,
      lastName,
      email,
      typeIds,
      skillsId,
      hour_rate,
      daily_capacity,
    } = req.body;

    validateFirstName(firstName, res);
    validateLastName(lastName, res);
    validateEmail(email, res);
    validateHour_Rate(hour_rate, res);
    validateDaily_Capacity(daily_capacity, res);

    const newTechnician = new Technician({
      firstName: firstName,
      lastName: lastName,
      email: email,
      typeIds: typeIds,
      skillsId: skillsId,
      hour_rate: hour_rate,
      daily_capacity: daily_capacity,
    });

    if(validateFirstName(firstName, res) &&  validateLastName(lastName, res) && validateEmail(email, res) && validateHour_Rate(hour_rate, res) && validateDaily_Capacity(daily_capacity, res)){
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

  // Retrieve a single technician by id
  exports.findOne = (req, res) => {

    if (!req.params.id) {
      return res.status(400).send({
        message: `Content cannot be empty!`,
      });
    }

    Technician.findOne({_id: req.params.id})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: `Technician with id: " ${req.params.id} " was not found`
          })
        }
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving technicians"
        })
      })
  };

  // Retrieve a single technician by Last Name
  exports.findOneLastName = (req, res) => {

    if (!req.params.lastName) {
      return res.status(400).send({
        message: `Content cannot be empty!`,
      });
    }

    Technician.findOne({lastName: req.params.lastName})
    .then(data => {
      if(!data){
        return res.status(404).send({
          message: `Technician with Last Name:${req.params.lastName} was not found`
        })
      }
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error ocurred while searching Last Name Technician."
      })
    })
  },

  // Update a Technician by id
  exports.update = (req, res) => {

    if (!req.body){
      return res.status(400).send({
        message: "data to update can not be empty!"
      })
    }
   
    if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity) {
      return res.status(400).send({
        message: `Content cannot be empty!2`
      });
    }
    const id = req.params.id;

    Technician.findOneAndUpdate({_id:id}, req.body, {useFindAndModify: false})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update technician with the id: " ${id} ". Maybe the technician was not found!`
          });
        } else res.send({
          message: "Technician was update successfully."
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the technician with id: " + id
        });
      });
  }
  // Delete a Technician 
  exports.delete = (req, res) => {

    if (!req.params.id) {
      return res.status(400).send({
        message: `Content cannot be empty!`,
      });
    }
  
    const id = req.params.id;
    
    Technician.findOneAndRemove({_id:id}, {useFindAndModify: false})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete technician with the id: " ${id} ". Maybe the technician was not found!`
          });
        } else res.send({
          message: `Technician with the id: " ${id} " was delete successfully.`
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error removing the Technician with the id: " + id
        });
      });
  };