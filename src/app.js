'use strict';
const debug = require('debug')('app');

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();


let corsOptions = {
  origin: 'http://example.com',
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

//built-in express body parser for raw JSON and for FORM posts
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Our api
import router from './api/api.js';
app.use(router);

//our 404 handling middleware and error handling middleware
app.use(notFound);
app.use(errorHandler);

//flag to let us 
let isRunning = false;

let server;
module.exports = {

  start: (port) => {
    if(!isRunning) {
      server = app.listen(port, err => {
        if(err) {throw err;}
        isRunning = true;
        console.log(`Server is up on port: ${port}`);

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
      isRunning = false;
      console.log('Server has been stopped');
    });
  },
};