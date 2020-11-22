const express = require('express');
const router = express.Router();
const buildings = require('./data/allBuilding');


 //GET ALL BUILDING
router.get('/:buildings', (req,res) => {
 res.json(buildings);
})

module.exports = router;