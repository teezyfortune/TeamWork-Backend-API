import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';

import * as mock from '../../services/articles/__mocks__';

const { expect } = chai;
chai.use(chaHttp);
let userToken;

describe('Authentication: Signup User', () => {
  it('It should create new user ', (done) => {
    chai
      .request(app)
      .post(mock.basesignUp)
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
      .send(mock.signIn)
      .end((err, response) => {
<<<<<<< HEAD
        });
=======
        userToken = response.body.data;
        console.log({
          '>>><>>>>>>>': userToken,
          '>>><>>>>>': mock.signIn,
          '>>>>>>>': response,
        });
        if (err) done(err);
>>>>>>> e80387d034197b521e714e6aec8bb60725d46af8
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

  it('It should update article with target id', (done) => {
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

describe('Authentication: Update Article', () => {
  it('It should update article with target id', (done) => {
    chai
      .request(app)
      .put(mock.baseuPdate)
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
      .put(mock.baseuPdate)
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
      .put(mock.baseuPdate)
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
