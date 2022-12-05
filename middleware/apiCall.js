const axios = require('axios')
const { response } = require('express')
let moment = require("moment")
const sql = require("../service.js")
const dbServices = require("../services/DBServices")// write another function in db services, giving boolean then use that in fetch all data
const cityStatsArray = [
    {
        city: "Adelaide",
        lat: -34.9285,
        long: 138.6007
    },
    {
        city: "Sydney",
        lat: -33.865143,
        long: 151.209900
    },
    {
        city: "Melbourne",
        lat: -37.840935,
        long: 144.946457
    },
    {
        city: "Perth",
        lat: -31.953512,
        long: 115.857048
    },
    {
        city: "Brisbane",
        lat: -27.470125,
        long: 153.021072
    },
    {
        city: "Hobart",
        lat: -12.462827,
        long: 130.841782
    },
    {
        city: "Darwin",
        lat: -12.462827,
        long: 130.841782
    }
]
let majorCitiesArray = []
const fetchAllData = async (req,res) => {
    console.log("sunsetMiddleware")
    for (let i = 0; i < cityStatsArray.length; i++) {
        let lat = cityStatsArray[i].lat
        let lng = cityStatsArray[i].long
        let city = cityStatsArray[i].city

        for (let j = 0; j <= 6; j++) {
            let cityObj = {}
            let date = moment().add(j, 'days').format('YYYY-MM-DD')
            const options = {
                method: 'GET',
                url: `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${date}`,
                headers: {
                    accept: 'application/json',
                    "accept-encoding": null,
                }
            }
            const response = await axios.request(options)
                .then((json) => {
                    let results = json.data.results
                    cityObj.cityName = city
                    cityObj.date = date
                    cityObj.sunriseTime = results.sunrise
                    cityObj.sunsetTime = results.sunset
                    cityObj.dawnTime = results.dawn
                    cityObj.duskTime = results.dusk
                    return cityObj
                })
            majorCitiesArray.push(response)
        };
    }
    return majorCitiesArray
}

const addAnother = async (req, res) => {
    console.log("sunsetMiddleware")

    let city = req.body.city;
    let lat = req.body.lat;
    let lng = req.body.lng
    let cityStatObj = { city: city, lat: lat, long: lng }
    cityStatsArray.push(cityStatObj)
    console.log(cityStatsArray)

    let newCityArray = []
    for (let j = 0; j <= 6; j++) {
        let cityObj = {}
        let date = moment().add(j, 'days').format('YYYY-MM-DD')
        const options = {
            method: 'GET',
            url: `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${date}`,
            headers: {
                accept: 'application/json',
                "accept-encoding": null,
            }
        }
        const response = await axios.request(options)
            .then((json) => {
                let results = json.data.results
                cityObj.cityName = city
                cityObj.date = date
                cityObj.sunriseTime = results.sunrise
                cityObj.sunsetTime = results.sunset
                cityObj.dawnTime = results.dawn
                cityObj.duskTime = results.dusk
            })
            majorCitiesArray.push(cityObj)
        
    }
    return majorCitiesArray
}

const updateAllData = async (req, res) => {
    {
        console.log("sunsetMiddleware")
        let majorCitiesArray = []

        for (let i = 0; i < cityStatsArray.length; i++) {
            let lat = cityStatsArray[i].lat
            let lng = cityStatsArray[i].long
            let city = cityStatsArray[i].city

            for (let j = 0; j <= 7; j++) {
                let cityObj = {}
                let date = moment().add(j, 'days').format('YYYY-MM-DD')
                console.log(date)
                const options = {
                    method: 'GET',
                    url: `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${date}`,
                    headers: {
                        accept: 'application/json',
                        "accept-encoding": null,
                    }
                }
                const response = axios.request(options)
                    .then((json) => {
                        let results = json.data.results
                        // console.log(results)
                        cityObj.cityName = city
                        cityObj.date = date
                        cityObj.sunriseTime = results.sunrise
                        cityObj.sunsetTime = results.sunset
                        cityObj.dawnTime = results.dawn
                        cityObj.duskTime = results.dusk
                        return cityObj
                    })
                majorCitiesArray.push(response)
            };
        }
        return majorCitiesArray
    }
}

module.exports = { fetchAllData, addAnother, updateAllData }

////////If statement for checking database populated.
// let truthyCheck = await dbServices.popOrNot()
// console.log("truthyCheck value: " + truthyCheck)
// if (truthyCheck){ for loops etc......
// else{ return majorCitiesArray}