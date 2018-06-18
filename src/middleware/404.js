'use strict';

export default (err, req, res, next) => {
  let error = {err:err};
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};