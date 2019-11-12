import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/articles/__mocks__';

const { expect } = chai;
chai.use(chaHttp);
let userToken;
describe('Test Suite for User Adim/employess logIn', () => {
  describe('Authentication: Signin User', () => {
    it('ARTICLE', (done) => {
      chai
        .request(app)
        .post(mock.baseLogin)
        .send(mock.signIn)
        .end((err, response) => {
          userToken = response.body.data;
          if (err) done(err);
          expect(response.statusCode).to.equal(200);
          done();
        });
    });

    it('It should create new article', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .set('authorization', `Bearer ${userToken.token}`)
        .send(mock.article)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
    it('It should respond with field can not be empty', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .set('authorization', `Bearer ${userToken.token}`)
        .send(mock.emptySpace)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(422);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
  });
});
