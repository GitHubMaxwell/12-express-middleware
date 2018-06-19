'use strict';
let app = require('../../../src/app.js');

import superagent from 'superagent';
// import app from '../../../src/app.js';

//create acceptance tests for GET PUT POST = use superagent
//use beforeAll and afterAll
//delete created notes after the tests have completed



describe('API MODULE', () => {
  // it('POL test', () => {
  //   expect(true).toBe(false);
  // });
  beforeAll(() => {
    app.start(3000);
  });
        
  afterAll(() => {
    app.stop();
  });

  it('POST SUCCESS: test', (done) => {
    let obj = {
      content:'max',
      title:'maxtitle',
    };
  
    superagent.post('http://localhost:3000/api/v1/cats')
      .send(obj)
      .then(data => {
        // wasnt getting body back because getJSON wasnt sending it back
        expect(data.body.title).toEqual('maxtitle');
        expect(data.status).toEqual(200);
        done();
      });
  });

  it('GET SUCCESS: test', (done) => {
    let obj = {
      content:'max',
      title:'maxtitle',
    };
  
    superagent.post('http://localhost:3000/api/v1/cats')
      .send(obj)
      .then(data => {
        // console.log('RES BODY: ', res.body);
        // console.log('RES BODY STATUS: ', res.status);
        superagent.get(`http://localhost:3000/api/v1/cats/${data.body.id}`)
          .then(res => {
            // expect(data).toBeDefined();
            //after confirmed getting positve make it fail just to stress test it
            expect(res.body.title).toEqual('maxtitle');
            expect(res.status).toEqual(200);
            done();
          });
      });
  });

}); //closing describe


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
