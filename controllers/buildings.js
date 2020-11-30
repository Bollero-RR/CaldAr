
const db = require("../models");
const Building = db.building;


//create & save a new building
exports.create = (req, res) => {
  const id = req.body.id
  const businessName = req.body.businessName
  const email = req.body.email
  const phone = req.body.phone
  const boilersAmount = req.body.boilersAmount
  const boilersType = req.body.boilersType

  //validate request
  if (!req.body.id || !req.body.businessName || !req.body.email || !req.body.phone  || !req.body.boilersAmount || !req.body.boilersType){
    return res.status(400).send({
      message: `Content cannot be empty!`
    }) 
  }

  //create a building
    const building = new Building({
    id: id,
    businessName:businessName,
    email:email,
    phone:phone,
    boilersAmount:boilersAmount,
    boilersType: boilersType
  })

  //save building in the DB
  building
    .save(building)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating Building."
      })
    })
};

//retrieve all buildings from DB
exports.findAll = (req, res) => {
Building.find({})
  .then(data => 
    res.send(data))
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error ocurrer while retrieving building"
    })
  })
};

//find a single building with an id
exports.findOne = (req, res) =>{
  Building.findOne({id: req.params.id})
  .then(data =>{
    if (!data){
      return res.status(404).send({
        message: `Building with id ${req.params.id} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving building."
    })
  })
};

//Update a Building by the id in the request
exports.update = (req, res) =>{
  if (!req.body){
    return res.status(400).send({
      message: "data to update can not be empty!"
    })
  }
  //validate request
  if (!req.body.id || !req.body.businessName || !req.body.email || !req.body.phone || !req.body.adress || !req.body.boilersAmount || !req.body.boilersType){
    res.status(400).send({ message: "content can not b empty"});
    return;
  }
  const id = req.params.id;

  Building.findOneAndUpdate({id}, req.body,{ useFindAndModify: false })
    .then(data =>{

      if (!data) {
        res.status(400).send({
          message:'Cannot update building with id=${id}. Maybe building was not found'})
      } else res.send({message: "building was update succesfully."});
  })
};

//delete a building 
exports.delete = (req, res) =>{
const id = req.params.id;
Building.findOneAndRemove({id}, {useFindAndModify: false})
  .then(data =>
    res.send({message: "building was removed sucessfully"})
    )
  .catch(err => {
    res.status(500).send({
      message: "error removing building"
    })
  })
};


