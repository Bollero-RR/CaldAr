const db = require("../models");
const Customer = db.customer;

const validateId = (id) => {
  if (!Number.isInteger(id)) {
    return res.status(400).send({
      message: `The content id is invalid!`,
    });
  }
  return true;
};

const validateCustomerType = (type) => {
  if (type !== "business" || type !== "particular") {
    return res.status(400).send({
      message: `The content of the maintenance fee must be business or particular!`,
    });
  }
  return true;
};

const validateEmail = (email) => {
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegExp.test(email)) {
    return res.status(400).send({
      message: `The email is invalid!`,
    });
  }
  return true;
};

const validateBuildings = (buildings) => {
  buildings.length && buildings.map((building) => {
    if(!Number.isInteger(building)){
      //search exist building
      return res.status(400).send({
        message: `The builing is invalid!`,
      });
    }
  });
  return true;
};

const validateFiscalAddress = (address) => {
  const lettersRegExp = /[a-z]/i;
  const numbersRegExp = /\d/g;

  const space = address.indexOf(" ");
  const cantLetter = address.length;
  const contentLetters = lettersRegExp.test(address);
  const contentNumbers = numbersRegExp.test(address);
  const firstWord = address.substring(0, space);
  const secondWord = address.substring(space + 1);

  if (
    space === -1 ||
    cantLetter < 5 ||
    !contentLetters ||
    !contentNumbers ||
    firstWord.length === 0 ||
    secondWord.length === 0
  ) {
    return res.status(400).send({
      message: `The address is invalid!`,
    });
  }
  return true;
};

//Get all customer
exports.findAll = (req, res) => {
  Customer.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Create customer
exports.create = (req, res) => {
  if (
    !req.body.id ||
    !req.body.customerType ||
    !req.body.email ||
    !req.body.buildings ||
    !req.body.fiscalAddress
  ) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  const { id, customerType, email, buildings, fiscalAddress } = req.body;

  validateId(id);
  validateCustomerType(customerType);
  validateEmail(email);
  validateBuildings(buildings);
  validateFiscalAddress(fiscalAddress);

  const newCustomer = new Customer({
    id: id,
    customerType: customerType,
    email: email,
    buildings: buildings,
    fiscalAddress: fiscalAddress,
  });

  newCustomer
    .save(newCustomer)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Get single customer
exports.findOne = (req, res) => {
  Customer.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Customer with id ${req.params.id} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Get single customer email
exports.findOneEmail = (req, res) => {
  Customer.findOne({ email: req.params.email })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Customer with id ${req.params.email} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Update customer
exports.update = (req, res) => {
  if (
    !req.body.id ||
    !req.body.customerType ||
    !req.body.email ||
    !req.body.fiscalAddress
  ) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  Customer.findOneAndUpdate({ id: req.body.id }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ message: `Customer was updated` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Delete customer
exports.delete = (req, res) => {
  Customer.findOneAndRemove({ id: req.body.id }, { useFindAndModify: false })
    .then((data) => res.send({ message: `Customer was removed` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};
