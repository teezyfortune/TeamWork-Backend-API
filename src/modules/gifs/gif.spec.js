import { describe, it } from 'mocha';
import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../app';
import * as mocks from '../../services/gifs/__mocks__/index';

const { expect } = chai;
chai.use(chaHttp);
let gifToken;

before((done) => {
  chai
    .request(app)
    .post(mocks.basesignUp)
    .send(mocks.User)
    .end((err, response) => {
      gifToken = response.body.data.token;
      done();
    });
});
// describe('Gif', () => {
//   it('It should create new new gif', async () => {
//     const response = await chai
//       .request(app)
//       .post(mocks.gifUrl)
//       .set('authorization', `Bearer ${gifToken}`)
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//       .field('title', 'test gif')
//       .attach('gif', fs.readFileSync(`${__dirname}/dancingbaby.gif`), 'dancingbaby.gif');
//     expect(response.statusCode).to.equal(201);
//     expect(response.body).to.contains({ status: 'success' });
//   });
// });

describe('DELETE GIF', () => {
  it('It should respond with field can not be empty', (done) => {
    chai
      .request(app)
      .delete(mocks.basedelete1)
      .set('Authorization', `Bearer ${gifToken.token}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(401);
        done();
      });
  });
});

it('It should respond with field can not be empty', (done) => {
  chai
    .request(app)
    .post(mocks.gifUrl)
    .set('Authorization', `Bearer ${gifToken.token}`)
    .send(mocks.emptySpace)
    .end((err, response) => {
      if (err) done(err);
      expect(response.statusCode).to.equal(401);
      done();
    });
});
// });
