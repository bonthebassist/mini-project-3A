var express = require('express');
var router = express.Router();

var sunsetController = require('../Controllers/sunsetController')

//Populate database DONE TRUNCATES AND FILLS DB
router.post('/populate', (req, res)=>{
    console.log("populate Route")
    sunsetController.getData(req,res)
});

//Get all Major cities for week DONE
router.get('/all/week', (req, res)=>{
    console.log("All major cities Route")
    sunsetController.retrieveAll(req,res)
});

//Get city by name for week DONE
router.get('/find/:cityName/week', (req, res)=>{
    console.log(`${req.params.cityName} route`)
    sunsetController.retrieveOne(req,res)
})

//Get all Major cities for Today
router.get('/all/today', (req, res)=>{
    console.log('all major cities coming week route')
    sunsetController.retrieveAllToday(req,res)
})

//Get city by name for today
router.get('/find/:cityName/today', (req, res)=>{
    console.log(`${req.params.cityName} coming week route`)
    sunsetController.retrieveOneToday(req,res)
})

// delete a city DONE
router.delete('/drop/:cityName', (req,res)=>{
    console.log(`Deleting ${req.params.cityName}`)
    sunsetController.deleteOne(req,res)
});

// update a city
router.put('/nickname/:cityName/:newCityName', (req,res)=>{
    console.log(`Updating ${req.params.cityName}`)
    sunsetController.setNickname(req,res)
});

// request a new city to be populated on database DONE
router.post('/addACity', (req,res)=>{
    console.log(`adding new city: ${req.body.city}`)
    sunsetController.createOne(req,res)
});

module.exports = router;













