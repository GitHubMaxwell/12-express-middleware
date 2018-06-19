'use strict';

const debug = require('debug')('api');

import express from 'express';
// modelFinder middleware reads :model in the URLs and susses out the right model to use.
// As you'll see, it gets jacked on to req.model so that you can reference it in your routes
import modelFinder from '../middleware/models.js';

//the express router replaces our home built custom router we used in the http server. it also allows you to modularize you code
const router = express.Router();

// console.log('MODELFINDER: ', modelFinder);

//whats the param method on express.Router() / check express docs
router.param('model', modelFinder);

/**
 * Render all records of a model
 * Note the error handling ....
 * Typically, you can just throw an error and your error handling middleware will run
 * In a promise, that doesn't work, but if you call next() with any params, Express
 * sees that as an error (the presence of a param) and calls your error middleware...
 */

//so we want to change this into middleware that we call along with error stuff?


//api methods
//the model param will determine which js file in model
router.get('/api/v1/:model', (req,res,next) => {
  debug('get all');
  req.model.fetchAll()
    .then(data => sendJSON(res,data))
    .catch(next);
});

//the URI has a specific model AND an id in order to retrieve a specific 
router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findOne(req.params.id)
    .then(data => sendJSON(res,data))
    .catch(next);
  //call the next function next(passStuffIn) if you wanted to
  //pass onto the next in the app.js
});

router.put('/api/v1/:model/:id', (req,res,next) => {
  console.log('PUUUUUUUUUUUUUUUTTTTTTTT');
  let record = new req.model(req.body);
  //   console.log('RECORD: ', record);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(next);
  //call the next function next(passStuffIn) if you wanted to
  //pass onto the next in the app.js
});
router.post('/api/v1/:model', (req,res,next) => {
//   console.log('GOT TO POST in api.js');
  //what is new req.model???
  //we are attaching the constructor class to req.model and passing in req.body as its config argument
  let record = new req.model(req.body);
  //   console.log('RECORD: ', record);
  record.save()
    .then(data => {
      // console.log('DATA: ',data);
      sendJSON(res,data);
    })
    .catch(err => {
      // console.log('WHY IS THE ERRORING', err);
      next();
    });
  //in the instance that no body exists we want to create an error for that 400
  // object keys checking for req.body length then next('no body') to call the erro 400 in app.js
});
//does this have to be at the end??
let sendJSON = (res,data) => {
  //we dont want to send the body back in the form of res.body we want to eiher .send or .write with the response
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
  res.end();
};
export default router;