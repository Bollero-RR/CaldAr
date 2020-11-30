const db = require("../models");
const Boiler = db.boilers;

//Get all Boiler
exports.findAll = (req, res) => {
  Boiler.find({})
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};

//Create Boiler
exports.create = (req, res) => {
  const id = req.body.id
  const typeId = req.body.typeId
  const maintainceRate = req.body.maintainceRate
  const hourMaintainceCost = req.body.hourMaintainceCost
  const hourEventualCost = req.body.hourEventualCost

  if(!req.body.id || !req.body.typeId || !req.body.maintainceRate || !req.body.hourMaintainceCost || !req.body.hourEventualCost){
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  const boiler = new Boiler ({
    id: id,
    typeId: typeId,
    maintainceRate: maintainceRate,
    hourMaintainceCost: hourMaintainceCost,
    hourEventualCost: hourEventualCost
  })

  boiler.save(boiler)
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
}
//Get single Boiler
exports.findOne = (req, res) => {
  Boiler.findOne({id: req.params.id})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `Boiler with id ${req.params.id} was not found`
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

//Get single Boiler email
exports.findOneType = (req, res) => {
  Boiler.findOne({typeId: req.params.type})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `Boiler with Type id ${req.params.typeId} was not found`
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

//Update Boiler
exports.update = (req, res) => {
  const id = req.body.id
  const typeId = req.body.typeId
  const maintainceRate = req.body.maintainceRate
  const hourMaintainceCost = req.body.hourMaintainceCost
  const hourEventualCost = req.body.hourEventualCost

  if(!req.body.id || !req.body.typeId || !req.body.maintainceRate || !req.body.hourMaintainceCost || !req.body.hourEventualCost){
    return res.status(400).send({
      message: `Content cannot be empty!`
    })
  }

  Boiler.findOneAndUpdate({id}, req.body, {useFindAndModify: false})
  .then(data => 
    res.send({message: `Boiler was updated`})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })

}

//Delete boiler
exports.delete = (req, res) => {
  const id = req.params.id;
  Boiler.findOneAndRemove({id}, {useFindAndModify: false})
  .then(data => 
    res.send({message: `Boiler was removed`})
  )
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error"
    })
  })
};