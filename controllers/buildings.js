
const db = require("../models");
const Building = db.building;


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
//create & save a new building
exports.create = (req, res) => {

   //validate request
  if (!req.body.id) {
    res.status(400).send({
      message:`por favor ingresa un id`
    })
  }
   else if (!req.body.businessName){
     res.status(400).send({
      message: `por favor ingresa tu nombre!`
       }) 
  }
  else if (!req.body.email){
    res.status(400).send({
     message: `por favor ingresa tu email!`
      }) 
 }
 else if (!req.body.phone){
  res.status(400).send({
   message: `por favor ingresa tu telefono!`
    }) 
}
else if (!req.body.adress){
  res.status(400).send({
   message: `por favor ingresa tu direccion!`
    }) 
}
else if (!req.body.boilersAmount){
  res.status(400).send({
   message: `por favor ingresa una cantidad de calderas!`
    }) 
} 
else if (!req.body.boilersType){
  res.status(400).send({
   message: `por favor ingresa un tipo de caldera`
    }) 
} 
else if (!req.body.boilersId){
  res.status(400).send({
   message: `por favor ingresa un id de caldera!`
    }) 
} 

  const id = req.body.id
  const businessName = req.body.businessName
  const email = req.body.email
  const phone = req.body.phone
  const adress = req.body.adress
  const boilersAmount = req.body.boilersAmount
  const boilersType = req.body.boilersType
  const boilersId = req.body.boilersId

  //create a building
    const newBuilding = new Building({
    id: id,
    businessName:businessName,
    email:email,
    adress: adress,
    phone:phone,
    boilersAmount:boilersAmount,
    boilersType: boilersType,
    boilersId: boilersId
  })

  //save building in the DB
  newBuilding
    .save(newBuilding)
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

//Retrieve a single building by phone
exports.findOnePhone = (req, res) => {
  Building.findOne({phone: req.params.phone})
  .then(data => {
    if(!data){
      return res.status(404).send({
        message: `Building with phone:${req.params.phone} was not found`
      })
    }
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error ocurred while searching phone Building."
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
  if (!req.body.id || !req.body.businessName || !req.body.email || !req.body.phone || !req.body.adress || !req.body.boilersAmount || !req.body.boilersType || !req.body.boilersId){
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


