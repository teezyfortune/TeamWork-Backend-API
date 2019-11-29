import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/users/__mocks__/index';

const { expect } = chai;
chai.use(chaHttp);

let userToken;
let adminToken;

describe('ADMIN', () => {
  chai
    .request(app)
    .post(mock.baseLogin)
    .send(mock.adminSignIn)
    .end((err, response) => {
      adminToken = response.body.data;
    });
});
describe('Test Suite for User Adim/employess Signup', () => {
  describe('Authentication: Signup User', () => {
    it('It should create new user ', (done) => {
      chai
        .request(app)
        .post(mock.baseUrl)
        .set('Authorization', `Bearer ${adminToken.token}`)
        .send(mock.User)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(201);
          done();
        });
    });

    describe('Authentication: Signup User', () => {
      it('It should create new user ', (done) => {
        chai
          .request(app)
          .post(mock.baseUrl)
          .set('Authorization', `Bearer ${adminToken.token}`)
          .send(mock.User2)
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
          .set('Authorization', `Bearer ${adminToken.token}`)
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
          .set('Authorization', `Bearer ${adminToken.token}`)
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
          .set('Authorization', `Bearer ${adminToken.token}`)
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

  describe('SIGNIN, Test Suite for Authentication signin ', () => {
    it('It should sigin user', (done) => {
      chai
        .request(app)
        .post(mock.baseLogin)
        .send(mock.signIn)
        .end((err, response) => {
          userToken = response.body.data;
          if (err) done(err);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.contains({ status: 'success' });
          done();
        });
    });

    it('It should respond with the credentials you provided are not correct', (done) => {
      chai
        .request(app)
        .post(mock.baseLogin)
        .send(mock.invalidSignIn)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(404);
          done();
        });
    });
  });
  describe('Update acount ', () => {
    it('It should successfully update a new contact', (done) => {
      chai
        .request(app)
        .patch(mock.baseUpdate)
        .set('Authorization', `Bearer ${userToken.token}`)
        .send(mock.updateProfile)
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.contains({ status: 'success' });
          done();
        });
    });
  });

  describe('View profile acount ', () => {
    it('It should successfully retrieve profile', (done) => {
      chai
        .request(app)
        .get(mock.baseProfile)
        .set('Authorization', `Bearer ${userToken.token}`)
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.contains({ status: 'success' });
          done();
        });
    });
  });
});
