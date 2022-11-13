import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.should();
chai.use(chaiHttp);

describe('/most-used-contract', () => {
  it('should return a transaction object with valid addresses', (done) => {
    chai
      .request(server)
      .post('/api/most-used-contract')
      .send({
        wallet_address: '0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should return a 400 with invalid wallet address', (done) => {
    chai
      .request(server)
      .post('/api/most-used-contract')
      .send({
        wallet_address: 'not an address',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.text.should.be.a('string');
        done();
      });
  });

  it('should return a 400 with no wallet address', (done) => {
    chai
      .request(server)
      .post('/api/most-used-contract')
      .send({})
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.text.should.be.a('string');
        done();
      });
  });
});
