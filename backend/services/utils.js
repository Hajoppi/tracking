'use strict';

const crypto = require('crypto'),
  algorithm = 'aes256',
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  secret = process.env.SECRET_KEY;

const utils = (module.exports = {});

if (!secret) {
  console.error('SECRET_KEY is not defined!');
  return process.exit(1);
}

utils.encrypt = text => {
  const cipher = crypto.createCipher(algorithm, secret);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

utils.decrypt = text => {
  const decipher = crypto.createDecipher(algorithm, secret);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final();
  return decrypted;
};

if (!secret) {
  console.error('SECRET_KEY is not defined!');
  return process.exit(1);
}

utils.hash = async password => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

utils.createToken = (userId, scope = 'normal') => {
  return jwt.sign({ id: userId, scope }, secret, { algorithm: 'HS256' });
};

utils.verifyToken = token => {
  const strippedToken = token.split(' ')[1];
  return jwt.verify(strippedToken, secret);
};

String.prototype.format = function(placeholders) {
  var s = this;
  for (var propertyName in placeholders) {
    var re = new RegExp('{' + propertyName + '}', 'gm');
    s = s.replace(re, placeholders[propertyName]);
  }
  return s;
};
