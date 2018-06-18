'use strict';

const storage = {};

const database = {};
//place to store notes we create in the models

storage.getAll = () => {
  return Promise.resolve(database);
  //resolves immediately
};

storage.get = (id) => {
  return new Promise ((resolve,reject) => {
    if( database[id]) {resolve(database[id]);}
    else { reject(`${id} not found`);}
  });
};

storage.save = (data) => {
  return new Promise((resolve, reject) => {
    if( data.id ) {
      database[data.id] = data;
      resolve(database[data.id]);
    }
    else {
      reject('Invalid Data (No ID)');
    }
  });
};

export default storage;


//no update or delete in this file