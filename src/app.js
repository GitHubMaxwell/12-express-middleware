'use strict';
const debug = require('debug')('app');

import express from 'express';
import morgan from 'morgan';
//morgan logging utility
import cors from './middleware/cors.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

// function logger(req, res, next) {
//   //dont forget the req,res,next and then to put to next() call at the end or res.end() etc
//   console.log('HELLO LOGGER');
//   next();
// }

// app.use(logger);

// let corsOptions = {
//   // origin: 'http://example.com',
//   // origin: '*',
//   origin: 'http:127.0.0.1:8080',
//   //make sure in the index.html naked script tag its going to the port you are running nodemon off of
// };

app.use(cors);
// app.use(cors(corsOptions));
//app.use exprects to be passed a function 
//need to create cors.js file to handle all the cors stuff

app.use(morgan('dev'));

//built-in express body parser for raw JSON and for FORM posts
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Our api
import router from './api/api.js';
app.use(router);
//goes into 

//our 404 handling middleware and error handling middleware
//this is equivalent to putting these at the bottom of the code in our api.js file???
app.use(notFound); //404.js
app.use(errorHandler); //error.js

//flag to let us 
let isRunning = false;

let server;
module.exports = {

  start: (port) => {
    if(!isRunning) {
      server = app.listen(port, err => {
        console.log(`Server is up on port: ${port}`);

        // app.listen(port, err => {
        if(err) {throw err;}
        isRunning = true;

        //what is debug
        debug(`Server is up on port: ${port}`);
      });
    } else {
      //what is debug
      debug('Server is already running');
    }
  },
  stop: () => {
    server.close(() => {
    // app.close(() => {
      isRunning = false;
      console.log('Server has been stopped');
    });
  },
};