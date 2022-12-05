const sunsetMiddleware = require('../middleware/apiCall.js')
const DBServices = require('../services/DBServices.js')

const getData = async(req,res) => {
    console.log("sunsetController")
    let resp = await sunsetMiddleware.fetchAllData(req,res)
    await DBServices.inputMajorCitiesData(resp)
    res.status(200).send("database populated")
}

const retrieveAll = async(req,res)=>{
    console.log("controller here")
    let resp = await DBServices.getAllCities(req,res)
    res.send(resp).status(200)
}

const retrieveOne = async(req,res)=>{
    console.log("controller here")
    let resp = await DBServices.getOneCity(req,res)
    console.log(resp)
    res.send(resp)
}

const retrieveAllToday = async(req,res)=>{
    console.log("controller here")
    let resp = await DBServices.getAllCitiesToday(req,res)
    res.send(resp)
}

const retrieveOneToday = async(req,res)=>{
    console.log("controller here")
    let resp = await DBServices.getOneCityToday(req,res)
    res.send(resp)
}

const deleteOne = async(req,res)=>{
    console.log("controller here")
    await DBServices.deleteOneCity(req,res)
    res.send(`${req.params.cityName} deleted`)
}

const createOne = async(req,res)=>{
    console.log("controller here")
    let resp = await sunsetMiddleware.addAnother(req, res)
    let data = await DBServices.addOneCity(resp)
    res.send({msg: `${req.body.city} has been added to the database` , response: resp})
}

const setNickname = async(req,res)=>{
    console.log("controller here")
    await DBServices.updateOne(req,res)
    res.send(`${req.params.cityName} updated to ${req.params.newCityName}`)
}

module.exports = {getData, retrieveAll, retrieveOne, deleteOne, 
    createOne, setNickname, retrieveAllToday, retrieveOneToday}