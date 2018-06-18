'use strict';

const debug = require('debug')('api');

import express from 'express';

//the express router replaces our home built custom router we used in the http server. it also allows you to modularize you code
const router = express.Router();

// modelFinder middleware reads :model in the URLs and susses out the right model to use.
// As you'll see, it gets jacked on to req.model so that you can reference it in your routes
import modelFinder from '../middleware/models.js';

//whats the param method on express.Router() / check express docs
router.param('model', modelFinder);

/**
 * Render all records of a model
 * Note the error handling ....
 * Typically, you can just throw an error and your error handling middleware will run
 * In a promise, that doesn't work, but if you call next() with any params, Express
 * sees that as an error (the presence of a param) and calls your error middleware...
 */

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
});

router.post('/api/v1/:model', (req,res,next) => {
  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(next);
});

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.statusHeader('Content-Type', 'application/json');
  res.end();
};

export default router;