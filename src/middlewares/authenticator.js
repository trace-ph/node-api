const moment = require('moment');

const hash = require('~helpers/hash');

// Should this be in the database instead?
const { IOS_SECRET, ANDROID_SECRET } = process.env;

// This looks dirty
const secrets = Object.freeze({
  IOS: process.env.NODE_ENV === 'test' ? 'TEST' : IOS_SECRET,
  ADR: process.env.NODE_ENV === 'test' ? 'TEST' : ANDROID_SECRET,
});

const authenticate = (req, res, next) => {
  const data = req.body ? JSON.stringify(req.body) : '';
  const md5Hash = hash.md5(data);

  // Get stuff from header
  const authorizationHeader = req.get('Authorization');
  const requestDate = req.get('Date');

  // Expect authorization header
  if (!authorizationHeader) return res.status(401).send('Unauthorized');

  const headerDate = moment(requestDate);

  // Check if request is stale
  if (!headerDate.isBetween(moment().subtract(30, 's'), moment().add(30, 's'))) {
    return res.status(401).send('Unauthorized');
  }

  // Get signature and platform
  const [, signaturePlatform] = authorizationHeader.split(' ');
  const [platformOrigin, requestSignature] = signaturePlatform.split(':');

  // Get secret for platform origin
  const secret = secrets[platformOrigin];

  // Check if we support platform origin
  if (!secret) return res.status(401).send('Unauthorized');

  // Get request meta
  const { method, originalUrl } = req;

  const [path] = originalUrl.split('?');

  // Generate signature
  const stringToSign = [method, md5Hash, requestDate, path].join('\n');
  const backendSignature = hash.sha1_hmac(secret, stringToSign);

  if (backendSignature !== requestSignature) res.status(401).send('Unauthorized');

  return next();
};

module.exports = authenticate;
