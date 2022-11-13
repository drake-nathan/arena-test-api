import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.should();
chai.use(chaiHttp);

describe('/most-tx', () => {
  it('should return an array of objects with transaction counts', (done) => {
    chai
      .request(server)
      .post('/api/most-tx')
      .send({
        contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        wallets: [
          '0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb',
          '0xdcae87821fa6caea05dbc2811126f4bc7ff73bd1',
          '0xd2a3f9C6FBE4C13D979898e603D64561264a6B35',
          '0x8b90eb28dd723fd07f31d1a6c867dcca00f10f1f',
        ],
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body[0].should.have.property('wallet');
        res.body[0].should.have.property('txCount');
        done();
      });
  });

  it('should return a 400 with invalid wallet address', (done) => {
    chai
      .request(server)
      .post('/api/most-tx')
      .send({
        contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        wallets: [
          '0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb',
          'not a valid address',
          '0xd2a3f9C6FBE4C13D979898e603D64561264a6B35',
          '0x8b90eb28dd723fd07f31d1a6c867dcca00f10f1f',
        ],
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.text.should.be.a('string');
        done();
      });
  });

  it('should return a 400 with invalid contract address', (done) => {
    chai
      .request(server)
      .post('/api/most-tx')
      .send({
        contract_address: 'not an address',
        wallets: [
          '0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb',
          '0xdcae87821fa6caea05dbc2811126f4bc7ff73bd1',
          '0xd2a3f9C6FBE4C13D979898e603D64561264a6B35',
          '0x8b90eb28dd723fd07f31d1a6c867dcca00f10f1f',
        ],
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.text.should.be.a('string');
        done();
      });
  });

  it('should return a 400 with no body in request', (done) => {
    chai
      .request(server)
      .post('/api/most-tx')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.text.should.be.a('string');
        done();
      });
  });
});
