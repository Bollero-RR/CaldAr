const db = require("../models");
const Customer = db.customer;

const validateId = (id, res) => {
  if (isNaN(id)) {
    return res.status(400).send({
      message: `The id is invalid!`,
    });
  }
  return true;
};

const validateCustomerType = (type, res) => {
  if (type !== "business" && type !== "particular") {
    return res.status(400).send({
      message: `The content of the customer type fee must be business or particular!`,
    });
  }
  return true;
};

const validateEmail = (email, res) => {
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegExp.test(email)) {
    return res.status(400).send({
      message: `The email is invalid!`,
    });
  }
  return true;
};

const validateBuildings = (buildings, res) => {
  buildings.length && buildings.map((building) => {
    if(!Number.isInteger(building)){
      //search exist building
      return res.status(400).send({
        message: `The content builing is invalid!`,
      });
    }
  });
  return true;
};

const validateFiscalAddress = (address, res) => {
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

  validateId(id, res);

  Customer.findOne({ id: id })
  .then((data) => {
    if (data) {
      return res.status(404).send({
        message: `Customer with id ${id} was exist`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error",
    });
  });


  validateCustomerType(customerType, res);
  validateEmail(email, res);
  validateBuildings(buildings, res);
  validateFiscalAddress(fiscalAddress, res);

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

  validateId(req.params.id, res);

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

  validateEmail(req.params.email, res);

  Customer.findOne({ email: req.params.email })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Customer with email ${req.params.email} was not found`,
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

  const { id, customerType, email, buildings, fiscalAddress } = req.body;

  validateId(id, res);

  Customer.findOne({ id: id })
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: `Customer with id ${id} was not exist`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error",
    });
  });

  validateCustomerType(customerType, res);
  validateEmail(email, res);
  validateBuildings(buildings, res);
  validateFiscalAddress(fiscalAddress, res);

  Customer.findOneAndUpdate({ id: req.body.id }, req.body)
    .then((data) => res.send({ message: `Customer was updated` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Delete customer
exports.delete = (req, res) => {

  validateId(req.params.id, res);
  
  Customer.findOneAndRemove({ id: req.body.id })
    .then((data) => res.send({ message: `Customer was removed` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};
