var crypto = require('crypto');
const secret = 'VerySecretKey';
function zeropad(value, digits = 16) {
  var fill = '0'.repeat(digits);
  return (fill + value).slice(-digits);
}

function getCounter(value) {
  var buffer = Buffer.alloc(8);
  if (Number.isFinite(value) || typeof value === 'bigint') {
    buffer.write(zeropad(value.toString(16)), 0, 'hex');
  } else if (Buffer.isBuffer(value)) {
    value.copy(buffer);
  } else if (typeof value === 'string') {
    buffer.write(zeropad(value), 0, 'hex');
  } else {
    throw new Error(`Unexpected counter value type ${typeof value}`);
  }
  return buffer;
}

/**
 * HMAC-Based One-Time Password (HOTP)
 * @param {Buffer|String} key
 * @param {Buffer|String|Number} counter
 * @param {Object} [options]
 * @param {String} [options.algorithm='sha1']
 * @param {Number} [options.digits=6]
 * @returns {String} token
 */
function hotp(key, counter) {
  const digits = 10;
  let hmac = crypto
    .createHmac('sha1', key)
    .update(getCounter(counter))
    .digest();

  //return zeropad( truncate( hmac, digits ), digits )
  return hmac.toString('base64');
}
/**
 * Time-Based One-Time Password (TOTP)
 * @param {Buffer|String} key
 * @param {Object} [options]
 * @param {Number} [options.algorithm='sha1']
 * @param {Number} [options.digits=6]
 * @param {Number} [options.time=(Date.now() / 1000)]
 * @param {Number} [options.timeStep=30]
 * @param {Number} [options.t0=0]
 * @returns {String}
 */
function totp(key, options) {
  var time = options && options.time != null ? options.time : Date.now() / 1000;
  var timeStep = (options && options.timeStep) || 30;
  var t0 = options && options.t0 != null ? options.t0 : 0;
  var digits = (options && options.digits) || 6;
  var algorithm = (options && options.algorithm) || 'sha1';
  var counter = totp.t(time, t0, timeStep);
  return hotp(key, counter, { algorithm, digits });
}

/**
 * Time-step function
 * @param {Number} t
 * @param {Number} t0
 * @param {Number} ts
 * @returns {Number}
 */
totp.t = function(t, t0, ts) {
  return Math.floor((t - t0) / ts);
};
module.exports = totp;
