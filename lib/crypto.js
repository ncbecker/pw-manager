const CryptoJS = require("crypto-js");

// stringify and parse included in case objects need to be crypted

// encryption

function encryptData(data, password) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
}

// decryption

function decryptData(data, password) {
  const bytes = CryptoJS.AES.decrypt(data, password);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

exports.encryptData = encryptData;
exports.decryptData = decryptData;
