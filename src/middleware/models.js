'use strict';

//this file will dynamically find and set the right model, base on the URL param /:model/:id
// import requireAll from 'require-dir';
//have to install this
//from require-dir npm package

//instead of require-dir use require-directory

// const models = requireAll('../models');
// const models = requireAll(modules, '../models'); this is for require-directory
//see what require all does in the docs
//it make an object holding all the modle file sand contents as key values pairs
/*
models : {
    'cats': {default: Function()...},
    'dogs': {default: Function()...}
}
*/

import cats from '../models/cats.js';

// console.log('Models OUTSIDE::: ', models);

export default (req, res, next) => {

//   console.log('REQ MODEL BEFORE: ', req.model);
  req.model = cats;
  //   console.log('REQ MODEL AFTER: ', req.model);
  next();

};


//   try {
      
//   let model = req && req.params && req.params.model;
//   console.log('Models INSIDE::::', models);
//   console.log('MODEL::::', model);

//   if( model && models[model] && models[model].default) {
//     req.model = models[model].default;
//     next();
//   }
//   else { 
//     console.log('Not finding model');
//     throw 'Model not found'; }
//   }
//   catch(err) {
//     console.log('Getting Err in models.js');
//     throw err;
//   }