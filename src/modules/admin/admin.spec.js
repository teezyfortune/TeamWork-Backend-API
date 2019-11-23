// import { describe, it } from 'mocha';
// import chai from 'chai';
// import chaHttp from 'chai-http';
// import app from '../../app';

// import * as mock from '../../services/admin/__mocks__';

// const { expect } = chai;
// chai.use(chaHttp);

// describe('ADMIN, Test Suite for Admin Authentication signin ', () => {
//   it('It should respond with all fields required', (done) => {
//     chai
//       .request(app)
//       .post(mock.baseLogin)
//       .send(mock.signIn)
//       .end((err, response) => {
//         if (err) done(err);
//         expect(response.statusCode).to.equal(200);
//         expect(response.body).to.contains({ status: 'Welcome admin' });
//         done();
//       });
//   });

//   it('It should respond with Yu are not allowed here', (done) => {
//     chai
//       .request(app)
//       .post(mock.baseLogin)
//       .send(mock.sign2)
//       .end((err, response) => {
//         if (err) done(err);
//         expect(response.statusCode).to.equal(404);
//         expect(response.body).to.contains({ status: 'error' });
//         done();
//       });
//   });
// });
