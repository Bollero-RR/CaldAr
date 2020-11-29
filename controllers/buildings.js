
const db = require("../models");
const building = db.building;
const express = require('express');
const router = express.Router();

//create & save a new building
exports.create = (req, res) => {
  //validate request
  if (!req.body.id || !req.body.businessName || !req.body.email || !req.body.phone || !req.body.adress || !req.body.boilersAmount || !req.body.boilersType){
  }
  //create a building
  const building = new building({
    id: req.body.id,
    businessName: req.body.businessName,
    email: req.body.email,
    phone: req.body.phone,
    adress: req.body.adress,
    boilersAmount: req.body.boilersAmount,
    boilersType: req.body.boilersType,
  });

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
      });
    });
};

//retrieve all buildings from DB
exports.findAll = (req, res) => {
building.findAll({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error ocurrer while retrieving building"
    });
  });
};

//find a single building with an id
exports.findOne = (req, res) =>{
  building.findOne({id: req.params.id})
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
    });
  });
};

//Update a Building by the id in the request
exports.update = (req, res) =>{
  if (!req.body){
    return res.status(400).send({
      message: "data to update can not be empty!"
    });
  }
  //validate request
  if (!req.body.id || !req.body.businessName || !req.body.email || !req.body.phone || !req.body.adress || !req.body.boilersAmount || !req.body.boilersType){
    res.status(400).send({ message: "content can not b empty"});
    return;
  }
  const id = req.params.id;

  building.findOneAndUpdate({id}, req.body,{ useFindAndModify: false })
    .then(data =>{

      if (!data) {
        res.status(400).send({
          message:'Cannot update building with id=${id}. Maybe building was not found'})
      } else res.send({message: "building was update succesfully."});
  });
};

//delete a building 
exports.delete = (req, res) =>{
const id = req.params.id;
building.findOneAndRemove({id}, {useFindAndModify: false})
  .then(data =>
    res.send({message: "building was removed sucessfully"})
    )
  .catch(err => {
    res.status(500).send({
      message: "error removing building"
    });
  });
};









// // DECLARATE CONST

// const express = require('express');
// const router = express.Router();
// const getBuildings = require('../data/buildings');
// const idFilter = (req) => (appointment) => appointment.id === parseInt(req.params.id);


// //GET ALL BUILDINGS

// router.get('/', (req,res) => {
//     res.json(getBuildings);
//  });
// // GET A SINGLE BUILDING BY ID

// router.get('/:id', (req, res) => {
//     const found = getBuildings.some(idFilter(req));
  
//     if (found) {
//       res.json(getBuildings.filter(idFilter(req)));
//     } else {
//       res.status(400).json({ msg: `Buildind not found with the id: ${req.params.id}` });
//     }
//   });
  
// //GET A BUILDING BY CATEGORY

// router.get('/fullName/:fullName', (req,res)=> {
//     const found = getBuildings.some(getBuildings => getBuildings.fullName === (req.params.fullName));
//     if (found){
//     res.json(getBuildings.filter(getBuildings => getBuildings.fullName === (req.params.fullName)));
//     }else{
//         res.status(400).send({msg: `Buildind not found with this Full Name: ${req.params.fullName}`});
//     }
// });

// //DELETE A BUILDING

//   router.delete('/:id', (req, res) => {
//     const found = getBuildings.some(idFilter(req));
  
//     if (found) {
//       res.json({
//         msg: 'Building deleted',
//         members: getBuildings.filter(getBuildings => !idFilter(req)(getBuildings))
//       });
//     } else {
//       res.status(400).json({ msg: `No Building with the id of ${req.params.id}` });
//     }
//   });

//EXPORT MODULE

module.exports = router;