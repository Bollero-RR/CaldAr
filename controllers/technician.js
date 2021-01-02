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

exports.create = (req, res) => {

  if (
    !req.body.firstName || 
    !req.body.lastName || 
    !req.body.email ||
    !req.body.hour_rate || 
    !req.body.daily_capacity
  ) {
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
    firstName,
    lastName,
    email,
    typeIds,
    skillsId,
    hour_rate,
    daily_capacity,
  });

  newTechnician
    .save(newTechnician)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creting the appointment"
      });
    });
};

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

exports.update = (req, res) => {
  if (
    !req.body.firstName || 
    !req.body.lastName || 
    !req.body.email || 
    !req.body.typeIds || 
    !req.body.skillsId || 
    !req.body.hour_rate || 
    !req.body.daily_capacity
  ) {
    return res.status(400).send({
      message: `Content cannot be empty!2`
    });
  }

  validateFirstName(req.body.firstName, res);
  validateLastName(req.body.lastName, res);
  validateEmail(req.body.email, res);
  validateHour_Rate(req.body.hour_rate, res);
  validateDaily_Capacity(req.body.daily_capacity, res);

  Technician.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => res.send({ message: `Technician was updated` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

exports.delete = (req, res) => {

  Technician.findOneAndRemove({ _id: req.params.id })
    .then((data) => res.send({ message: `Technician was removed` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};
