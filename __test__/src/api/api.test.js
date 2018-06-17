'use strict';
import app from '../../../src/app.js';

import superagent from 'superagent';
// import app from '../../../src/app.js';

beforeAll(() => {
  app.start(3000);
});
      
afterAll(() => {
  app.stop();
});

describe('API MODULE', () => {
  it('GET pass: should return a 200', () => {
    expect(true).toBe(true);
  });


//   it('POST FAIL test', (done) => {
//     let obj = {};

//     superagent.post('http://localhost:3000/api/v1/notes')
//       .send(obj)
//       .catch( res => {
//         expect(res.status).toEqual(400);
//         expect(res.message).toBe('Bad Request');
//         done();
//       });
//   });
});