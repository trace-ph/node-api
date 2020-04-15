const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment');

const server = require('../../index');
const { getConnectionUrl } = require('~/configs/database.config');

const Device = require('~models/device.model');
const hash = require('~helpers/hash');

beforeAll(async () => {
  const url = getConnectionUrl(true);
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe('Device', () => {
  afterEach(async () => {
    await Device.deleteMany();
  });

  it('should greet (using android secret)', async (done) => {
    const body = {
      device_id: 'F6:E6:65:88:4D:CA',
    };

    const route = '/api/device/';

    const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    const md5 = hash.md5(JSON.stringify(body));
    const signature = hash.sha1_hmac('TEST', ['POST', md5, timestamp, route].join('\n'));

    const response = await request(server)
      .post(route)
      .set('Authorization', `TRACE-PH ADR:${signature}`)
      .set('Date', timestamp)
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    done();
  });

  it('should fail if request is stale', async (done) => {
    const body = {
      device_id: 'J6:E6:65:88:4D:CD',
    };

    const route = '/api/device/';

    const timestamp = moment().subtract(31, 's').format('YYYY-MM-DDTHH:mm:ss.SSS');
    const md5 = hash.md5(JSON.stringify(body));
    const signature = hash.sha1_hmac('TEST', ['POST', md5, timestamp, route].join('\n'));

    const response = await request(server)
      .post(route)
      .set('Authorization', `TRACE-PH ADR:${signature}`)
      .set('Date', timestamp)
      .send(body);

    expect(response.status).toBe(401);

    done();
  });
});
