# mini-project-3A
Mini project on microservices

## Features
- Uses sunset.io
- Route to populate an SQL database with a third party API call for sunset/sunrise times of major Australian cities
- Add a city to the database
- Update city names with nicknames
- Full route documentation in swagger doc.

## To run
- Clone this repo in your local
- In the project directory run 'npm i' to install dependencies
- Create a folder called 'config' inside the main directory, and a file called 'db.config.js'
- Inside that file paste this code, filling in the blanks for which database you would like to store your data in. Make sure there is a table called 'cities' within your database for the services to work
- module.exports = {
    HOST: "localhost",
    USER: xxx,
    PASSWORD: xxx,
    DB: xxx
  };
- In the project directory run 'node service.js' to start the server
