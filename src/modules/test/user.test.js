import { expect, chai } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/__mocks__/index';

chai.use(chaiHttp);

describe('Test Suite for Authentication ', () => {
  describe('Authentication: Signup User', () => {
    it('It should create new user ', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .send(mock.User)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(201);
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
          expect(response.body).to.contains({ status: 422 });
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
          expect(response.body).to.contains({ status: 422 });
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
          expect(response.body).to.contains({ status: 422 });
          done();
        });
    });
  });
});
