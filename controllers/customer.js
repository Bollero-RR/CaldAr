const db = require("../models");
const Customer = db.customer;

//Get all customer
exports.findAll = (req, res) => {
  Customer.find({})
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};

//Create customer
exports.create = (req, res) => {

  if(!req.body.id || !req.body.customerType || !req.body.email || !req.body.fiscalAddress){
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  const id = req.body.id
  const customerType = req.body.customerType
  const email = req.body.email
  const buildings = req.body.buildings
  const fiscalAddress = req.body.fiscalAddress

  const newCustomer = new Customer ({
    id: id,
    customerType: customerType,
    email: email,
    buildings: buildings,
    fiscalAddress: fiscalAddress
  })

  newCustomer.save(newCustomer)
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
}

//Get single customer
exports.findOne = (req, res) => {
  Customer.findOne({id: req.params.id})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `Customer with id ${req.params.id} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};

//Get single customer email
exports.findOneEmail = (req, res) => {
  Customer.findOne({email: req.params.email})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `Customer with id ${req.params.email} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};

//Update customer
exports.update = (req, res) => {

  if(!req.body.id || !req.body.customerType || !req.body.email || !req.body.fiscalAddress){
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  Customer.findOneAndUpdate({id: req.body.id}, req.body, {useFindAndModify: false})
  .then(data => 
    res.send({message: `Customer was updated`})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })

}

//Delete customer
exports.delete = (req, res) => {

  Customer.findOneAndRemove({id: req.body.id}, {useFindAndModify: false})
  .then(data => 
    res.send({message: `Customer was removed`})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};