'use strict';
let app = require('../../../src/app.js');

import superagent from 'superagent';
// import app from '../../../src/app.js';

describe('API MODULE', () => {
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
            expect(res.body.title).toEqual('maxtitle');
            expect(res.status).toEqual(200);
            done();
          });
      });
  });

  it('PUT SUCCESS: test', (done) => {
    let obj = {
      content:'max',
      title:'maxtitle',
    };
  
    superagent.post('http://localhost:3000/api/v1/cats')
      .send(obj)
      .then(data => {
        superagent.put(`http://localhost:3000/api/v1/cats/${data.body.id}`)
          .send({content: 'john', title: 'smith'})
          .then(res => {
            expect(res.body.title).toEqual('smith');
            expect(res.status).toEqual(200);
            done();
          });
      });
  });

  // it('DELETE ALL SUCCESS: test', (done) => {
  //   superagent.delete('http://localhost:3000/api/v1/cats')
  //     .then(data => {
  //       expect(data.status).toEqual(200);
  //       done();
  //     });
  // });

}); //closing describe
