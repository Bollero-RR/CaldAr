const db = require("../models");
const BoilerType = db.boilerType;

//Get all boiler type
exports.findAll = (req, res) => {
  BoilerType.find({})
  .then(data => {
    res.send(data); 
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};

//Create boiler type
exports.create = (req, res) => {
  if(!req.body.id || !req.body.type || !req.body.stock || !req.body.skillId || !req.body.description){
    return res.status(400).send({
      message: 'Content cannot be empty!'
    })
  }
  const { id, type, stock,  description, skillId } = req.body;
  const newBoilerType = new BoilerType ({
    id,
    type,
    stock,
    description,
    skillId
  })
  newBoilerType
  .save(newBoilerType)
  .then(data => { 
    //console.log('==Create Data==>', data);
    res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the boiler type"
    })
  })
}

//Get single boiler type
exports.findOneType = (req, res) => {
  BoilerType.findOne({type: req.params.type})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `boiler with type ${req.params.type} was not found`
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
        message: `boiler with id ${req.params.id} was not found`
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
  if(!req.body.id || !req.body.type || !req.body.stock || !req.body.skillId || !req.body.description){
      return res.status(400).send({
        message: 'Content cannot be empty!'
      })
  }
    BoilerType.findOneAndUpdate({id: req.params.id}, req.body, {useFindAndModify: false})
    .then(data => {
      console.log('==update Data==>', data);
      res.send({message: 'boiler type was updated'})
    }
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
    res.send({message: 'boiler type was removed'})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while delete the  boiler type"
    })
  })
};