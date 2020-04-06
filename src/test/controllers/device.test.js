/* eslint camelcase: 0 */

const mongoose = require('mongoose');
const request = require('supertest');
const server = require('~/index');
const { getConnectionUrl } = require('~/configs/database.config');

const Device = require('~/models/device.model');

beforeAll(async () => {
  const url = getConnectionUrl(true);
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe('Device', () => {
  afterEach(async () => {
    await Device.deleteMany();
  });

  it('should greet', async (done) => {
    const response = await request(server).post('/api/device/').send({
      device_id: 'F6:E6:65:88:4D:CA',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    done();
  });
});
