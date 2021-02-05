/* eslint camelcase: 0 */

const mongoose = require('mongoose');
const request = require('supertest');
const server = require('~/index');
const { getConnectionUrl } = require('~/configs/database.config');

const Contact = require('~models/node-contact.model');

beforeAll(async () => {
  const url = getConnectionUrl(true);
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe('Contact', () => {
  afterEach(async () => {
    await Contact.deleteMany();
  });

  it('should save a contact', async (done) => {
    const type = 'direct-bluetooth';
    const timestamp = '2020-04-06T00:00:00';
    const source_node_id = '145670bc-a98c-4f1a-91ec-fef0d1686c19';
    const node_pair = '345aa247-cbfa-427e-aaeb-a6f93cd1dc66';
    const locationType = 'Point';
    const coordinates = [0, 0];

    const response = await request(server).post('/api/node_contacts/').send({
      contacts: [
        {
          type,
          timestamp,
          source_node_id,
          node_pairs: [
            node_pair,
          ],
          location: {
            coordinates,
            type: locationType,
          },
        },
      ],
    });

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body.length).toEqual(1);
    expect(body[0]).toHaveProperty('created_at');
    expect(body[0]).toHaveProperty('updated_at');

    done();
  });
});
