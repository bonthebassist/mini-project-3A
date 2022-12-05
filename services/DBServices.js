const sql = require("../service.js")
const moment = require("moment")

const popOrNot = async (req,res)=>{
    return new Promise((resolve, reject) =>{
            sql.query(`SELECT EXISTS (SELECT 1 FROM cities);`, (err, result, field) => {
            if(err) return reject(err);
            
            // console.log("popOrNot = " + result[0]['EXISTS (SELECT 1 FROM cities)'])
            if (result[0]['EXISTS (SELECT 1 FROM cities)'] === 0){
                console.log("We need data!")
                result = true
            }
            else {
                console.log("data already present")
                result = false
            }
            console.log("the popOrNot result is: " + result)
            console.log("type of result" + typeof result)
            console.log(result)
            resolve(result)
        })
    })
}

const inputMajorCitiesData = async (data,req,res)=>{
    console.log("inputMajorCitiesData services here")

    new Promise((resolve, reject) =>{
        let sqlQuery = `TRUNCATE cities;`;
        sql.query(sqlQuery, (err, result, field) => {
            if (err) return reject(err);
            resolve(Object.values(("truncated the table")));
        })
    }).then(
        result => {
            console.log(data)
            let inserts = [];
            for (let i = 0; i < data.length; i++) {
                let cityName = data[i].cityName;
                let date = data[i].date;
                let sunset = data[i].sunsetTime;
                let sunrise = data[i].sunriseTime;
                let dawn = data[i].dawnTime;
                let dusk = data[i].duskTime;
                inserts.push([null, cityName, date, sunset, sunrise, dawn, dusk]);
            }
            new Promise((resolve, reject) => {
                sql.query({
                    sql: 'INSERT INTO cities(id, cityName, date, sunsetTime, sunriseTime, dawnTime, duskTime) VALUES ?',
                    values: [inserts]
                }, (err, result, field) => {
                    if (err) return reject(err);
                    resolve("inserted into table");
                })
            })
        }
    )
    return "inserted data"
}

const getAllCities = async (res)=>{
    console.log("db services here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM cities`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    });  
}

const getOneCity = async (req, res)=>{
    console.log("db services here")
    let cityName = req.params.cityName
    console.log(typeof cityName)
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM cities WHERE cityName='${cityName}'`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    });  
}

const getAllCitiesToday = async (res)=>{
    console.log("db services here")

    return new Promise((resolve, reject) => {
        let date = moment().format('YYYY-MM-DD')
        let sqlQuery = `SELECT * FROM cities WHERE date='${date}'`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    });  
}

const getOneCityToday = async (req, res)=>{
    console.log("get one city today db services here")
    let cityName = req.params.cityName
    console.log(cityName)
    return new Promise((resolve, reject) => {
        let date = moment().format('YYYY-MM-DD')
        let sqlQuery = `SELECT * FROM cities WHERE cityName='${cityName}' AND date='${date}'`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    });  
}

const deleteOneCity = async (req,res)=>{
    console.log('db services here')
    let cityName = req.params.cityName;
    return new Promise((resolve, reject) => {
        let sqlQuery = `DELETE FROM cities WHERE cityName='${cityName}'`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    });  

}

const addOneCity = async(resp)=>{
    console.log("db services here")
    for (let i = 0; i<resp.length; i++){
    let date = resp[i].date
    let cityName = resp[i].cityName;
    let sunset = resp[i].sunsetTime;
    let sunrise = resp[i].sunriseTime;
    let dawn = resp[i].dawnTime;
    let dusk = resp[i].duskTime;

    new Promise((resolve, reject) => {
        let sqlQuery = `INSERT INTO cities VALUES (null, '${cityName}', '${sunrise}', '${sunset}', '${dawn}', '${dusk}', '${date}')`;
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    });
    }
}   

const updateOne =async(req,res)=>{
    console.log("db services here")
    let cityName = req.params.cityName
    let nickname = req.params.newCityName
    return new Promise((resolve, reject) => {
        let sqlQuery = `UPDATE cities SET cityName = '${nickname}' WHERE cityName='${cityName}'`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            resolve(Object.values(result));
        });
    }); 
    
}
module.exports = {inputMajorCitiesData, getAllCities, getOneCity, deleteOneCity, 
    addOneCity, updateOne, getAllCitiesToday, getOneCityToday}


//     var inserts = [];
// inserts.push(['name1', 'email1']);
// inserts.push(['name2', 'email2']);

// conn.query({
//     sql: 'INSERT into mytable (name, email) VALUES ?',
//     values: [inserts]
//     });

//     let populateDB = async (data) => {
//         console.log("db services here")
//         console.log(data.data[0].id)
//         data = data.data
//         new Promise((resolve, reject) => {
//             let sqlQuery = `truncate NBATeams;`;
//             sql.query(sqlQuery, (err, result, field) => {
//                 if (err) return reject(err);
//                 console.log("in first promise in populatedb, before resolve")
//                 resolve(Object.values(("truncated the table")));
//                 console.log("in first promise in populatedb, after resolve")
//             })
//             console.log("in first promise in populatedb, after sqlquery")
//         }).then(
//             result => {
//                 var inserts = [];
//                 console.log("before for loop")
//                 for (let i = 0; i < data.length; i++) {
//                     id = data[i].id
//                     abbreviation = data[i].abbreviation
//                     city = data[i].city
//                     conference = data[i].conference
//                     division = data[i].division
//                     full_name = data[i].full_name
//                     shortname = data[i].name
//                     inserts.push([id, abbreviation, city, conference, division, full_name, shortname]);
//                 }
//                 new Promise((resolve, reject) => {
//                     sql.query({
//                         sql: 'INSERT INTO NBATeams(id, abbreviation, city, conference, division, full_name, shortname) VALUES?',
//                         values: [inserts]
//                     }, (err, result, field) => {
//                         if (err) return reject(err);
//                         console.log("in sql query, before resolve")
//                         resolve("inserted into table");
//                     })
//                 }).then(
//                     result => {
//                         console.log("in .then, in result before resolve")
//                     }
//                 )
//             },
//             error => { console.log("error") })
//         return "inserted data"
//     }