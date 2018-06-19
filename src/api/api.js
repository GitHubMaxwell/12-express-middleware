'use strict';

const debug = require('debug')('api');

import express from 'express';
import modelFinder from '../middleware/models.js';

const router = express.Router();

// console.log('MODELFINDER: ', modelFinder);

router.param('model', modelFinder);

/**
 * Render all records of a model
 * Note the error handling ....
 * Typically, you can just throw an error and your error handling middleware will run
 * In a promise, that doesn't work, but if you call next() with any params, Express
 * sees that as an error (the presence of a param) and calls your error middleware...
 */

//so we want to change this into middleware that we call along with error stuff?

router.get('/api/v1/:model', (req,res,next) => {
  debug('get all');
  req.model.fetchAll()
    .then(data => sendJSON(res,data))
    .catch(next);
});

router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findOne(req.params.id)
    .then(data => sendJSON(res,data))
    .catch(next);
});

router.put('/api/v1/:model/:id', (req,res,next) => {
  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(next);
});

router.delete('/api/v1/:model', (req,res,next) => {
  req.model.deleteAll()
    .then(() => deleteSuccess(res))
    .catch(err => {
      console.log('deleteAll Error');
      next();
    });
});

router.post('/api/v1/:model', (req,res,next) => {
  let record = new req.model(req.body);
  record.save()
    .then(data => {
      sendJSON(res,data);
    })
    .catch(err => {
      next();
    });
  //in the instance that no body exists we want to create an error for that 400
  // object keys checking for req.body length then next('no body') to call the erro 400 in app.js
});
let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
  //we dont want to send the body back in the form of res.body we want to eiher .send or .write with the response
  res.end();
};

let deleteSuccess = (res) => {
  console.log('deleteSuccess');
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.end();
};
export default router;