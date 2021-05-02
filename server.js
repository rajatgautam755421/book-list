const { request } = require('express');
const express = require ('express');
const app = express();
const { connect } = require("mongoose");
const authRoute = require('./routes/auth');
const bookRoute = require('./routes/bookroutes')
const bodyParser = require('body-parser')
const postRoute = require('./routes/path')
const verify = require('./routes/verifyToken');
port = 3000;
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


//Routes
app.use('/user',authRoute);
app.use('/book',bookRoute);

//Connecton to my local database
connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      try {
        console.log("Connected to database");
      } catch (error) {
        console.log(error);
      }
    }
  );

//app listening at port 3000
app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})