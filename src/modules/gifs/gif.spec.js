import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mocks from '../../services/gifs/__mocks__/index';

const { expect } = chai;
chai.use(chaHttp);
let gifToken;

describe('Authentication: Signin User', () => {
  it('ARTICLE', (done) => {
    chai
      .request(app)
      .post(mocks.gifUrl)
      .send(mocks.sign2)
      .end((err, response) => {
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
<<<<<<< HEAD
      .set('authorization', `Bearer ${gifToken.token}`)
=======
      .set('Authorization', `Bearer ${gifToken.token}`)
>>>>>>> fb725fdb41236ea1fdc5bca970ea12cd11c01238
      .send(mocks.correctGif)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });
<<<<<<< HEAD
  it('It should respond with field can not be empty', (done) => {
    chai
      .request(app)
      .post(mocks.gifUrl)
      .set('authorization', `Bearer ${gifToken.token}`)
      .send(mocks.emptySpace)
=======
});
describe('DELETE GIF', () => {
  it('It should respond with field can not be empty', (done) => {
    chai
      .request(app)
      .delete(mocks.basedelete1)
      .set('Authorization', `Bearer ${gifToken.token}`)
>>>>>>> fb725fdb41236ea1fdc5bca970ea12cd11c01238
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(422);
        expect(response.body).to.contains({ status: 'error' });
        done();
      });
  });
});
<<<<<<< HEAD
=======

it('It should respond with field can not be empty', (done) => {
  chai
    .request(app)
    .post(mocks.gifUrl)
    .set('Authorization', `Bearer ${gifToken.token}`)
    .send(mocks.emptySpace)
    .end((err, response) => {
      if (err) done(err);
      expect(response.statusCode).to.equal(422);
      expect(response.body).to.contains({ status: 'error' });
      done();
    });
});
>>>>>>> fb725fdb41236ea1fdc5bca970ea12cd11c01238
