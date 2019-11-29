import { describe, it } from 'mocha';
import fs from 'fs';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';
import * as mocks from '../../services/gifs/__mocks__/index';

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
        gifToken = response.body.data;
        done();
      });
  });
});
describe('Gif', () => {
  it('It should create new new gif', async () => {
    try {
      const response = await chai
        .request(app)
        .post(mocks.gifUrl)
        .set('authorization', `Bearer ${gifToken.token}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test gif')
        .attach('gif', fs.readFileSync(`${__dirname}/images/dancingbaby.gif`), 'dancingbaby.gif');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.contains({ status: 'success' });
    } catch (err) {
      console.log(err);
    }
  });
});

describe('DELETE GIF', () => {
  it('It should return 404 ', (done) => {
    chai
      .request(app)
      .delete(mocks.basedelete1)
      .set('authorization', `Bearer ${gifToken.token}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(404);
        done();
      });
  });
  // it('It should respond with field can not be empty', (done) => {
  //   chai
  //     .request(app)
  //     .post(mocks.gifUrl)
  //     .set('Authorization', `Bearer ${gifToken.token}`)
  //     .send(mocks.emptySpace)
  //     .end((err, response) => {
  //       if (err) done(err);
  //       expect(response.statusCode).to.equal(401);
  //       done();
  //     });
  // });
});
