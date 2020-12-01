const db = require("../models");
const Technician = db.technician;

  //Create and save a new technician
  exports.create = (req, res) => {

    //Validate Request
    if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity) {
      return res.status(400).send({
        message: `Content cannot be empty!`
      })
    }

    //Create an Technician
    const technician = new Technician({
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      typeIds: req.body.typeIds,
      skillsId: req.body.skillsId,
      hour_rate: req.body.hour_rate,
      daily_capacity: req.body.daily_capacity
    });

    //Save technicians in the database
    technician
      .save(technician)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creting the technician"
        });
      });
  };
  //Retrieve all technicians from database
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

  //Find a single technician with the id
  exports.findOne = (req, res) => {
    Technician.findOne({
        id: req.params.id
      })
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

  //Retrieve a single technician by Last Name
  exports.findOneLastName = (req, res) => {
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

  //Update an Technicians by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: `Data updated can not be empty!`
      });
    }
    
    //Valdiate Request
    if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity) {
      return res.status(400).send({
        message: `Content cannot be empty!2`
      });
    }
    const id = req.params.id;
    Technician.findOneAndUpdate({
        id
      }, req.body, {
        useFindAndModify: false
      })
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
  //Delete an Technician with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Technician.findOneAndRemove({
        id
      }, {
        useFindAndModify: false
      })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete technician with the id: " ${id} ". Maybe the technician was not found!`
          });
        } else res.send({
          message: "Technician was update successfully."
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error removing the Technician with the id: " + id
        });
      });
  };