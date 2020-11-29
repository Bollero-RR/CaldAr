const db = require("../models");
const Technician = db.technician;

// Create and save a new Technician
exports.create = (res,req) => {
  // Validate request
  if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  
  //Create a new Technician
  const technician = new Technician ({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    typeIds: req.body.typeIds,
    skillsId: req.body.skillsId,
    hour_rate: req.body.hour_rate,
    daily_capacity: req.body.daily_capacity, 
  });

  // Save Technician in the database
  technician
    .save(technician)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error in the Technician creation"
      })
    })
};

// Update a technician by id
exports.update = (req,res) => {
  if (!req.body) {
    return res.status(400).send ({
      message: "Data to update can not be empty!"
    })
  }
  // Validate request
  if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.typeIds || !req.body.skillsId || !req.body.hour_rate || !req.body.daily_capacity) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const id = req.params.id;

  Technician.findOneAndUpdate({id}, req.body, { useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update technician with id=${id}. Maybe technician was not found!`
        });
      } else res.send({ message: "Technician was update successfully."})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Technician with id=" + id
      });
    });
}

// Delete a Technician with id
exports.delete = (req,res) => {
  const id = req.params.id;
  Technician.findOneAndRemove({id}, { useFindAndModify: false})
    .then(data => {
      res.send({ message: "Technician was removed successfully" })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error removing Technician with id=" + id
    })
}

// Retrieve all technicians 
exports.findAll = (req,res) => {
  Technician.find({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error ocurred while retriving technicians"
  })
};


// Retrieve a single technician with id
exports.findOne = (req,res) => {
  Technician.findOne({id: req.params.id})
  .then(data => {
    if (!data) {
      return res.status(400).send({
        message: `Technician with id ${req.params.id} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error ocurred while retriving technician"
  })
}
