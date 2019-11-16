import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/gifs/gif.services';

const { expect } = chai;
chai.use(chaHttp);
let userToken;

describe('Authentication: Signin User', () => {
  it('ARTICLE', (done) => {
    chai
      .request(app)
      .post(mock.gifUrl)
      .send(mock.gifSignIn)
      .end((err, response) => {
        userToken = response.body.data;
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        done();
      });
  });

  it('It should create new new gif', (done) => {
    chai
      .request(app)
      .post(mock.gifUrl)
      .set('authorization', `Bearer ${userToken.token}`)
      .send(mock.correctGif)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });
  it('It should respond with field can not be empty', (done) => {
    chai
      .request(app)
      .post(mock.gifUrl)
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
