let express = require("express")
let app = express()

///////// add mySQL into project (npm install mysql) 
const mysql = require('mysql');
const dbConfig = require('./config/db.config.js');

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

let PORT = 3000

let cors = require("cors")  //stops browser error (npm install cors)
app.use(cors())

app.use(express.json());// to access body from postman


//////// MySQL starts here

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;


/////// routing / webserver starts here

let sunsetRoute = require('./Routes/sunsetRoute')

app.use('/', sunsetRoute)

app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}`)})