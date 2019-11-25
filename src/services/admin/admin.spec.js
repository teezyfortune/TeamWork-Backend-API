// import { describe, it } from 'mocha';
// import chai from 'chai';
// import chaHttp from 'chai-http';
// import app from '../../app';

// import * as mock from './__mocks__';

// const { expect } = chai;
// chai.use(chaHttp);
// let adminToken;
// let fakeToken;

// describe('ADMIN, Test Suite for Admin Authentication signin ', () => {
//   it('It should respond with all fields required', (done) => {
//     chai
//       .request(app)
//       .post(mock.baseLogin)
//       .send(mock.signIn)
//       .end((err, response) => {
//         adminToken = response.body.data;
//         console.log({ sign: mock.signIn,
//                       '>>>><><>>': response     })
//         if (err) done(err);
//         expect(response.statusCode).to.equal(200);
//         expect(response.body).to.contains({ status: 'Welcome admin' });
//         done();
//       });
//   });
//   it('It should respond with you are not allowed here..', (done) => {
//     chai
//       .request(app)
//       .post(mock.baseLogin)
//       .send(mock.sign2)
//       .end((err, response) => {
//         fakeToken = response.body.data;
//         if (err) done(err);
//         expect(response.statusCode).to.equal(404);
//         expect(response.body).to.contains({ status: 'error' });
//         done();
//       });
//   });

//   it('it respond as above', (done) => {
//     chai
//       .request(app)
//       .get(mock.baseGet)
//       .set('Authorization', `Bearer ${fakeToken.token}`)
//       .end((err, response) => {
//         if (err) done(err);
//         expect(response.statusCode).to.equal(404);
//         expect(response.body).to.contains({ status: 'error' });
//         done();
//       });
//   });

//   it('It should get all users', (done) => {
//     chai
//       .request(app)
//       .get(mock.baseGet)
//       .set('Authorization', `Bearer ${adminToken.token}`)
//       .end((err, response) => {
//         if (err) done(err);
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//   });
// });
