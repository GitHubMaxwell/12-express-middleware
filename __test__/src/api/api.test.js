'use strict';
import app from '../../../src/app.js';

import superagent from 'superagent';
// import app from '../../../src/app.js';

//create acceptance tests for GET PUT POST = use superagent
//use beforeAll and afterAll
//delete created notes after the tests have completed

beforeAll(() => {
  app.start(3000);
});
      
afterAll(() => {
  app.stop();
});

describe('API MODULE', () => {
  it('POL test', () => {
    expect(true).toBe(false);
  });

  it('GET SUCCESS: test', () => {
    
    expect(true).toBe(false);
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