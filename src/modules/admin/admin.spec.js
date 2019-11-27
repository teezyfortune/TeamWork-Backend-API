import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';
import * as mock from '../../services/admin/__mocks__';

let adminToken;

const { expect } = chai;
chai.use(chaHttp);

before((done) => {
  chai
    .request(app)
    .post(mock.signup)
    .send(mock.Admin)
    .end((err, response) => {
      adminToken = response.body.data.token;
      done();
    });
});
describe('ADMIN', () => {
  it('It should create new user', (done) => {
    chai
      .request(app)
      .post(mock.signup)
      .send(mock.User)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });
});

it('It should return 404', (done) => {
  chai
    .request(app)
    .get(mock.baseGet)
    .set('Authaurization', `Bearer ${adminToken}`)
    .end((err, response) => {
      if (err) done(err);
      expect(response.statusCode).to.equal(404);
      done();
    });
});
