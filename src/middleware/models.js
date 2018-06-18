'use strict';

//this file will dynamically find and set the right model, base on the URL param /:model/:id
import requireAll from 'require-dir';
//have to install this
//from require-dir npm package
const models = requireAll('../models');
//see what require all does in the docs
//it make an object holding all the modle file sand contents as key values pairs
/*
models : {
    'cats': {default: Function()...},
    'dogs': {default: Function()...}
}
*/

console.log('Models::: ', models);

export default (req, res, next) => {
    
  try {
    let model = req && req.params && req.params.model;
    if( model && models[model] && models[model].default) {
      req.model = models[model].default;
      next();
    }
    else { 
      console.log('Not finding model');
      throw 'Model not found'; }
  }
  catch(err) {
    console.log('Getting Err in models.js');
    throw err;
  }
};