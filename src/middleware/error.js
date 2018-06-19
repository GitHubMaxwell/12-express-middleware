'use strict';

export default (req, res, next) => {
  console.log('ERROR.JS ERROR');
  let error = { error:'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};