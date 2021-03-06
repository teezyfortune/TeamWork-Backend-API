import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/articles/__mocks__';

const { expect } = chai;
chai.use(chaHttp);
let userToken;
let adminToken;

before((done) => {
  chai
    .request(app)
    .post(mock.baseLogin)
    .send(mock.adminSignIn)
    .end((err, response) => {
      adminToken = response.body.data;
      done();
    });
});


describe('Authentication: Signup User', () => {
  it('It create new user ', (done) => {
    chai
      .request(app)
      .post(mock.basesignUp)
      .set('Authorization', `Bearer ${adminToken.token}`)
      .send(mock.User)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(201);
        done();
      });
  });
});

describe('Authentication: Signin User', () => {
  it('ARTICLE', (done) => {
    chai
      .request(app)
      .post(mock.baseLogin)
      .set('authorization', `Bearer ${adminToken.token}`)
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
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });

  it('It should create new article with target id', (done) => {
    chai
      .request(app)
      .post(mock.baseUrl)
      .set('authorization', `Bearer ${userToken.token}`)
      .send(mock.article1)
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

describe('Update Article', () => {
  it('It should update article with target id', (done) => {
    chai
      .request(app)
      .patch(mock.baseuPdate)
      .set('authorization', `Bearer ${userToken.token}`)
      .send(mock.article1)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });

  it('It should update article with target id', (done) => {
    chai
      .request(app)
      .patch(mock.baseuPdate)
      .set('authorization', `Bearer ${userToken.token}`)
      .send(mock.article1)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contains({ status: 'success' });
        done();
      });
  });

  it('It should respond with field can not be empty', (done) => {
    chai
      .request(app)
      .patch(mock.baseuPdate)
      .set('authorization', `Bearer ${userToken.token}`)
      .send(mock.emptySpace)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(422);
        expect(response.body).to.contains({ status: 'error' });
        done();
      });
  });

  describe('Authentication: Delete Article', () => {
    it('It should respond with field can not be empty', (done) => {
      chai
        .request(app)
        .delete(mock.basedelete1)
        .set('authorization', `Bearer ${userToken.token}`)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.contains({ status: 'success' });
          done();
        });
    });
    it('it should respond with this article have been deleted by you', (done) => {
      chai
        .request(app)
        .delete(mock.basedelete2)
        .set('authorization', `Bearer ${userToken.token}`)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
  });

  describe('Comment Article', () => {
    it('It should create new comment', (done) => {
      chai
        .request(app)
        .post(mock.baseComment)
        .set('authorization', `Bearer ${userToken.token}`)
        .send(mock.correctcomment)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(201);
          expect(response.body).to.contains({ status: 'success' });
          done();
        });
    });

    it('It should respond with invalid authorization or not loggedIn', (done) => {
      chai
        .request(app)
        .post(mock.baseComment)
        .send(mock.correctcomment)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(401);
          done();
        });
    });

    it('this field can not be empty', (done) => {
      chai
        .request(app)
        .post(mock.baseComment)
        .set('authorization', `Bearer ${userToken.token}`)
        .send(mock.emptycomment)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(422);
          expect(response.body).to.contains({ status: 'error' });
          done();
        });
    });
  });

  describe('Get all articles', () => {
    it('should respond with success', (done) => {
      chai
        .request(app)
        .get(mock.baseGeAll)
        .set('authorization', `Bearer ${userToken.token}`)
        .end((err, response) => {
          if (err) done(err);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.contains({ status: 'success' });
          done();
        });
    });
  });
});
