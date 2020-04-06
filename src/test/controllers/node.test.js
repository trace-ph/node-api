/* eslint camelcase: 0 */

const mongoose = require('mongoose');
const request = require('supertest');
const server = require('~/index');
const { getConnectionUrl } = require('~/configs/database.config');

const Node = require('~models/nodes.model');

beforeAll(async () => {
  const url = getConnectionUrl(true);
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe('Node', () => {
  afterEach(async () => {
    await Node.deleteMany();
  });

  it('should get a node', async (done) => {
    const device_id = 'F6:E6:65:88:4D:CA';
    await request(server).post('/api/node/').send({ device_id });
    const response = await request(server).get('/api/node/').query({ device_id });

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body.length).toEqual(1);
    expect(body[0]).toHaveProperty('device_id', device_id);

    done();
  });

  it('should return 204 if node does not exist', async (done) => {
    const device_id = 'F6:E6:65:88:4D:CA';
    const response = await request(server).get('/api/node/').query({ device_id });

    const { status } = response;

    expect(status).toBe(204);

    done();
  });

  it('should save a node', async (done) => {
    const device_id = 'F6:E6:65:88:4D:CA';
    const response = await request(server).post('/api/node/').send({
      device_id,
    });

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty('device_id', device_id);

    done();
  });

  it('should not save a node with an invalid device_id', async (done) => {
    const device_id = 'xxxxxx';
    const response = await request(server).post('/api/node/').send({
      device_id,
    });
    const expected = `device_id has an invalid format: ${`"${device_id}"`}`;

    const { body, status } = response;

    expect(status).toBe(422);
    expect(body).toHaveProperty('error', expected);

    done();
  });

  it('should return an existing node when saving an already existing device_id', async (done) => {
    const device_id = 'F6:E6:65:88:4D:CA';

    await request(server).post('/api/node/').send({
      device_id,
    });

    const response = await request(server).post('/api/node/').send({
      device_id,
    });

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty('device_id', device_id);

    done();
  });
});
