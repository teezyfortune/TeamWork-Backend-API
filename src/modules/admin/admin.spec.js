import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';
import * as mock from '../../services/admin/__mocks__';

let adminToken;

const { expect } = chai;
chai.use(chaHttp);

describe('ADMIN', () => {
  chai
    .request(app)
    .post(mock.baseLogin)
    .send(mock.adminSignIn)
    .end((err, response) => {
      adminToken = response.body.data;
    });
});
it('It should return all employees ', (done) => {
  chai
    .request(app)
    .get(mock.baseGet)
    .set('Authorization', `Bearer ${adminToken.token}`)
    .end((err, response) => {
      if (err) done(err);
      expect(response.statusCode).to.equal(200);
      done();
    });
});
