const db = require("../models");
const Building = db.building;
const numbersEr =/\d/g;
const lettersEr = new RegExp('[A-D]','i')

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

//validate fields
    //validate ID
    const validateId = (res, id) => {
      if (isNaN(id)) {
        return res.status(400).send({
          message: `please write a valid ID`,
        });
      }
      return true;
    };

    //validate BusinessName
    const validateBusinessName = (res, businessName) => {
      const lettersAmount = businessName.length;
      if (lettersAmount < 2) {
        return res.status(400).send({
          message: `The name must contain 2 letters or less`,
        });
      }
      return true;
    };

    //validate email
    const validateEmail = (res, email) => {
      const at = email.indexOf("@");
      const com = email.indexOf(".com");
      if (at === -1 || com ===-1) {
        return res.status(400).send({
          message: `invalid e-mail, the E-mail must contain @ and .com`,
        });
      }
      return true;
    };

    //validate phone
    const validatePhone = (res, phone) => {
      const numberAmount = phone.length;
      const character = new RegExp('^[+0-9]+[^-_()\\s]$');
      if (numberAmount <7 || !character.test(phone)) {
        return res.status(400).send({
          message: `Number of at least 7 digits, do not accept spaces, hyphens or parentheses`,
        });
      }
      return true;
    };
    //validate Adress
    const validateAdress = (res, adress) =>{
      const lettersAmount = adress.length;
      const space = adress.indexOf(" ");
      const gotNumber = numbersEr.test(adress);

      if (lettersAmount < 5 || space ===-1 || !gotNumber) {
        return res.status(400).send({
          message: `adress must contain least 5 characters, with letters, numbers and a space`,
        });
      }
      return true;
    }

    //validate Boilers Amount
    const validateBoilerAmount = (res, boilersAmount) =>{
      if (boilersAmount >2){
        return res.status(400).send({
          message: `can be only 1 or 2 boilers amount`,
        });
      }
      return true;
    }
    //validate Boilers Type
    const validateBoilersType = (res, boilersType) =>{
     const letters = lettersEr.test(boilersType)
      
      if (!letters){
        return res.status(400).send({
          message: `Can be type A, B,C OR D`,
        });
      }
      return true;
    }
  
    //validate Boilers ID
    const validateBoilersId = (res, boilersId) => {

      if (boilersId < 1 || boilersId > 10) {
        return res.status(400).send({
          message: `The type of boiler does not exist!`,
        });
      }
      return true;
    };

//create & save a new building
exports.create = (req, res) => {

   //validate request

if (!req.body.id || !req.body.businessName || 
  !req.body.email || !req.body.phone || !req.body.adress 
  || !req.body.boilersAmount || !req.body.boilersType 
  || !req.body.boilersId){
  res.status(400).send({
  message: `please complete all the fields!`
   }) 
  } 

  const id = req.body.id;
  const businessName = req.body.businessName;
  const email = req.body.email;
  const phone = req.body.phone;
  const adress = req.body.adress;
  const boilersAmount = req.body.boilersAmount;
  const boilersType = req.body.boilersType;
  const boilersId = req.body.boilersId;

  validateId (res,id);
  validateBusinessName(res,businessName);
  validateEmail(res,email);
  validatePhone(res,phone);
  validateAdress(res,adress);
  validateBoilerAmount(res,boilersAmount);
  validateBoilersType(res,boilersType);
  validateBoilersId(res,boilersId);



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