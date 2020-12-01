const db = require("../models");
const BoilerType = db.boilerType;

//Get all boiler type
exports.findAll = (req, res) => {
  BoilerType.find({})
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};

//Create boiler type
exports.create = (req, res) => {
  const id = req.body.id;
  const type = req.body.type; 
  const stock = req.body.stock; 

  if(!req.body.id || !req.body.type || !req.body.sotck){
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  const boilerType = new BoilerType ({
    id: id,
    type: type,
    stock: stock
  })

  boilerType.save(boilerType)
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the  boiler type"
    })
  })
}

//Get single boiler type
exports.findOneType = (req, res) => {
  BoilerType.findOne({type: req.params.type})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `boiler type with type ${req.params.id} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while searching the  boiler type"
    })
  })
};

//Get single id
exports.findOneId = (req, res) => {
  BoilerType.findOne({id: req.params.id})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `boiler type with id ${req.params.id} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while searching the  boiler type"
    })
  })
};

//Update boiler type
exports.update = (req, res) => {
  const id = req.body.id;
  const type = req.body.type;
  const state = req.body.state;
  const history = req.body.hitory;
  const stock = req.body.sotck;
  const installed = req.body.installed;

  if(!id || !type || !state || !history || !sotck || !installed){
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  BoilerType.findOneAndUpdate({id}, req.body, {useFindAndModify: false})
  .then(data => 
    res.send({message: `boiler type was updated`})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while update the  boiler type"
    })
  })

}

//Delete boiler 
exports.delete = (req, res) => {
  const id = req.params.id;
  BoilerType.findOneAndRemove({id}, {useFindAndModify: false})
  .then(data => 
    res.send({message: `boiler type was removed`})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while delete the  boiler type"
    })
  })
};