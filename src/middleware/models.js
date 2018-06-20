'use strict';

//instead of require-dir use require-directory
// const models = requireAll(modules, '../models'); this is for require-directory
/*
models : {
    'cats': {default: Function()...},
    'dogs': {default: Function()...}
}
*/

import cats from '../models/cats.js';

export default (req, res, next) => {
  req.model = cats;
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