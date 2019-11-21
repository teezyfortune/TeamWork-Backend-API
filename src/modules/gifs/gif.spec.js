import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mocks from '../../services/gifs/__mocks__/index';
import { log } from 'util';

const { expect } = chai;
chai.use(chaHttp);
let gifToken;

describe('Authentication: Signup User', () => {
  it('It should create new user ', (done) => {
    chai
      .request(app)
      .post(mocks.basesignUp)
      .send(mocks.User)
      .end((err, response) => {
        console.log('====================================');
        console.log(err, response);
        console.log('====================================');
        if (err) done(err);
        expect(response.statusCode).to.equal(201);
        done();
      });
  });
});
describe('Authentication: Signin User', () => {
  it('GIF', (done) => {
    chai
      .request(app)
      .post(mocks.gifLogin)
      .send(mocks.signIn)
      .end((err, response) => {
        console.log('====================================');
        console.log(err, response);
        console.log('====================================');
        gifToken = response.body.data;
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
  it('It should create new new gif', (done) => {
    chai
      .request(app)
      .post(mocks.gifUrl)
      .set('Authorization', `Bearer ${gifToken.token}`)
      .send(mocks.correctGif)
      .end((err, response) => {
        console.log(err, 'ERR');
        console.log(response, 'Response');
        if (err) done(err);
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  }).timeout(5000);

  //   it('It should create new new gif', (done) => {
  //     chai
  //       .request(app)
  //       .post(mocks.gifUrl)
  //       .set('authorization', `Bearer ${gifToken.token}`)
  //       .send(mocks.correctGif1)
  //       .end((err, response) => {
  //         if (err) done(err);
  //         expect(response.statusCode).to.equal(201);
  //         expect(response.body).to.contains({ status: 'success' });
  //         done();
  //       });
  //   });
});
// describe('DELETE GIF', () => {
//   it('It should respond with field can not be empty', (done) => {
//     chai
//       .request(app)
//       .delete(mocks.basedelete1)
//       .set('Authorization', `Bearer ${gifToken.token}`)
//       .end((err, response) => {
//         if (err) done(err);
//         expect(response.statusCode).to.equal(422);
//         expect(response.body).to.contains({ status: 'error' });
//         done();
//       });
//   });
// });

// it('It should respond with field can not be empty', (done) => {
//   chai
//     .request(app)
//     .post(mocks.gifUrl)
//     .set('Authorization', `Bearer ${gifToken.token}`)
//     .send(mocks.emptySpace)
//     .end((err, response) => {
//       if (err) done(err);
//       expect(response.statusCode).to.equal(422);
//       expect(response.body).to.contains({ status: 'error' });
//       done();
//     });
//   });
// });
