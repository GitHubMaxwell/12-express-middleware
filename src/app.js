'use strict';
const debug = require('debug')('app');

import express from 'express';
import morgan from 'morgan';
import cors from './middleware/cors.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

import router from './api/api.js';
app.use(router);
app.use(notFound); //404.js
app.use(errorHandler); //error.js

let isRunning = false;

let server;
module.exports = {

  start: (port) => {
    if(!isRunning) {
      server = app.listen(port, err => {
        console.log(`Server is up on port: ${port}`);
        if(err) {throw err;}
        isRunning = true;
        debug(`Server is up on port: ${port}`);
      });
    } else {
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