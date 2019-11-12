import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/__mocks__/index';

const { expect } = chai;
chai.use(chaHttp);

describe('Test Suite for User Adim/employess Signup', () => {
  describe('Authentication: Signup User', () => {
    it('It should create new user ', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .send(mock.User)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(201);
          console.log(response.message);
          done();
        });
    });
    it('It should respond with all fields invalid ', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .send(mock.emptyString)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(422);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
    it('It should respond with all fields required', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(422);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
    it('It should respond with all fields required', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .send(mock.unDefined)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(422);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
  });
});

describe('Test Suite for Authentication signin ', () => {
  it('It should respond with all fields required', (done) => {
    chai
      .request(app)
      .post(mock.baseLogin)
      .send(mock.signIn)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });

  it('It should respond with all fields required', (done) => {
    chai
      .request(app)
      .post(mock.baseLogin)
      .send(mock.invalidSignIn)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.contains({ status: 'error' });
        done();
      });
  });
});
