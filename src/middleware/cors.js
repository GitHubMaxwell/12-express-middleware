import cors from 'cors';

let corsOptions = {
  origin :'*',
};

export default (req, res, next) => {
//   console.log('HITTING CORS MIDDLEWARE');
  cors(corsOptions);
  next();
  //dont forget to call next OR end the req-res cycle with something like res.end / res.send / etc in middleware
};
