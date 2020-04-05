const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../index');
const { getConnectionUrl } = require('~/configs/database.config');

const Node = require('../models/nodes.model');

beforeAll(async () => {
  const url = getConnectionUrl(true);
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe('Node', () => {
  afterEach(async () => {
    await Node.deleteMany();
  });

  it('should save a node', async (done) => {
    const response = await request(server).post('/api/node/').send({
      device_id: 'F6:E6:65:88:4D:CA',
    });

    expect(response.status).toBe(200);

    done();
  });
});
