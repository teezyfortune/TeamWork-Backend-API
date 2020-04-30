import { describe, it } from 'mocha';
import fs from 'fs';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';
import * as mocks from './__mocks__/index';

const { expect } = chai;
chai.use(chaHttp);
let gifToken;
let adminToken;

before((done) => {
  chai
    .request(app)
    .post(mocks.gifLogin)
    .send(mocks.adminSignIn)
    .end((err, response) => {
      adminToken = response.body.data;
      done();
    });
});

describe('SIGNUP', () => {
  it('should create new user ', (done) => {
    chai
      .request(app)
      .post(mocks.basesignUp)
      .set('Authorization', `Bearer ${adminToken.token}`)
      .send(mocks.User)
      .end((err, response) => {
        expect(response.statusCode).to.equal(201);
        done();
      });
  });
  it('login User ', (done) => {
    chai
      .request(app)
      .post(mocks.gifLogin)
      .set('Authorization', `Bearer ${adminToken.token}`)
      .send(mocks.signIn)
      .end((err, response) => {
        gifToken = response.body.data;
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
  it('It should create new new gif', (done) => {
    chai
      .request(app)
      .post(mocks.gifUrl)
      .set('authorization', `Bearer ${gifToken.token}`)
      .send(mocks.correctGif)
      .end((err, response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });
  it('It should return 200', (done) => {
    chai
      .request(app)
      .delete(mocks.basedelete1)
      .set('authorization', `Bearer ${gifToken.token}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});
