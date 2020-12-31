
const db = require("../models");
const Building = db.building;

const numbersEr =/\d/g;
const lettersEr = new RegExp('[A-D]','i')

const validateBusinessName = (res, businessName) => {
  const lettersAmount = businessName.length;
  if (lettersAmount < 2) {
    return res.status(400).send({
      message: `The name must contain 2 letters or less`,
    });
  }
  return true;
};

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

const validatePhone = (res, phone) => {
const numberAmount = phone.length;
const character = new RegExp('^[+0-9]+[^-_()\\s]$');
  if ( numberAmount<7 || !character.test(phone)) {
    return res.status(400).send({
      message: `Number of at least 7 digits, do not accept spaces, hyphens or parentheses`,
    });
  }
  return true;
};
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

exports.findAll = (req, res) => {
  Building.find({})
    .then(data => 
      res.send(data))
    .catch(err => {
      res.status(404).send({
        message:
          err.message ||"Some error ocurrer while retrieving building"
      })
    })
};

exports.create = (req, res) => {

if (!req.body.businessName || 
  !req.body.email ||
   !req.body.phone || 
   !req.body.adress ||
   !req.body.boilersId
   ){
  res.status(400).send({
  message: `please complete all the fields!`
   }) 
  } 

  const {businessName,email,phone,adress,boilersId} =req.body;

  validateBusinessName(res,businessName);
  validateEmail(res,email);
  validatePhone(res,phone);
  validateAdress(res,adress);
  
    const newBuilding = new Building({
      businessName,
      email,
      adress,
      phone,
      boilersId
  })

  newBuilding
    .save(newBuilding)
    .then(data =>{
        res.status(201).send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating Building."
      })
    })
};

exports.findOnePhone = (req, res) => {
  if (!req.params.phone){
    return res.status(400).send({
      message: "phone can not be empty!"
    });
  };
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

exports.findOne = (req, res) =>{
  if (!req.params.id){
    return res.status(400).send({
      message:'content cannot be empty',
    });
  };

  Building.findOne({_id: req.params.id})
  .then(data =>{
    if (!data){
      return res.status(404).send({
        message: `Building with id ${req.params.id} was not found`
      })
    }
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving building."
    });
  });
};

exports.update = (req, res) =>{
  if (!req.body){
    return res.status(400).send({
      message: "data to update can not be empty!"
    })
  }
 
  const businessName = req.body.businessName;
  const email = req.body.email;
  const phone = req.body.phone;
  const adress = req.body.adress;
  
  validateBusinessName(res,businessName);
  validateEmail(res,email);
  validatePhone(res,phone);
  validateAdress(res,adress);
  
  Building.findOneAndUpdate({_id: req.params.id}, req.body,{ useFindAndModify: false })
    .then(data =>{
      if (!data) {
        res.status(400).send({
          message:'Cannot update building with id=${id}. Maybe building was not found'})
      } else res.status(200).send({message: "building was update succesfully."});
  })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal server error",
      });
    });
};

exports.delete = (req, res) =>{

Building.findOneAndRemove({_id: req.body.id})
  .then((data) =>
    res.status(200).send({message: "building was removed sucessfully"})
    )
  .catch((err) => {
    res.status(500).send({
      message: "error removing building"
    })
  })
};
