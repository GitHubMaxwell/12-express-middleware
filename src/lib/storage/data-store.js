'use strict';

import memoryStorage from './memory.js';
import fileStorage from './filesystem.js';

let dataStorageModule = {};

//Based what STORAGE is set to in our env file or from any other mechanism that sets this

//gonna have a dope ass switch statement which, per our storage mode selection (via env file in this case = process.env.STORAGE) will check the first

switch( process.env.STORAGE) {
case 'filesystem':
  dataStorageModule = fileStorage;
  break;
default:
  dataStorageModule = memoryStorage;
  break;
}

export default dataStorageModule;