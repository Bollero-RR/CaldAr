// DECLARATE CONST

const express = require('express');
const router = express.Router();
const getBuildings = require('../data/buildings');
const idFilter = (req) => (appointment) => appointment.id === parseInt(req.params.id);


//GET ALL BUILDINGS

router.get('/', (req,res) => {
    res.json(getBuildings);
 });
// GET A SINGLE BUILDING BY ID

router.get('/:id', (req, res) => {
    const found = getBuildings.some(idFilter(req));
  
    if (found) {
      res.json(getBuildings.filter(idFilter(req)));
    } else {
      res.status(400).json({ msg: `Buildind not found with the id: ${req.params.id}` });
    }
  });
  
//GET A BUILDING BY CATEGORY

router.get('/fullName/:fullName', (req,res)=> {
    const found = getBuildings.some(getBuildings => getBuildings.fullName === (req.params.fullName));
    if (found){
    res.json(getBuildings.filter(getBuildings => getBuildings.fullName === (req.params.fullName)));
    }else{
        res.status(400).send({msg: `Buildind not found with this Full Name: ${req.params.fullName}`});
    }
});

//DELETE A BUILDING

  router.delete('/:id', (req, res) => {
    const found = getBuildings.some(idFilter(req));
  
    if (found) {
      res.json({
        msg: 'Building deleted',
        members: getBuildings.filter(getBuildings => !idFilter(req)(getBuildings))
      });
    } else {
      res.status(400).json({ msg: `No Building with the id of ${req.params.id}` });
    }
  });

//EXPORT MODULE

module.exports = router;