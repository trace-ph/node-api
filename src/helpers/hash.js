const crypto = require('crypto');

const sha1Hmac = (secret, string, digest = 'base64') => crypto.createHmac('sha1', secret).update(string).digest(digest);

module.exports = {
  md5: (data) => crypto.createHash('md5').update(data || '', 'utf8').digest('hex'),
  sha1_hmac: sha1Hmac,
};
