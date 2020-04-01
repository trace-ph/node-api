const mongoose = require("mongoose");
const server = require("../index");
const request = require("supertest");

const Device = require('../models/device.model');

beforeAll(async () => {
  const url = process.env.TEST_DB_CONN || 'mongodb://localhost:27017/test-traceph';
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe('Device', () => {

  afterEach(async () => {
    await Device.deleteMany();
  });

  it('should greet', async (done) => {
    const response = await request(server).post('/api/device/').send({
      'device_id': 'F6:E6:65:88:4D:CA',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    done();
  });
});
