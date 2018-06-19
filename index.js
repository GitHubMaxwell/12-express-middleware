'use strict';

require('babel-register');

require('dotenv').config();

require('./src/app.js').start(process.env.PORT);