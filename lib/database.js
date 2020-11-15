const CryptoJS = require("crypto-js");
const { MongoClient } = require("mongodb");

// DB Connection

let client;
let db;

async function connect(url, dbName) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

function close() {
  return client.close();
}

function collection(name) {
  return db.collection(name);
}

// CRUD Functions

// READ ONE

async function findPasswordByName(passwordName) {
  const passwordObject = await collection("passwords").findOne({
    name: passwordName,
  });
  return passwordObject;
}

async function getPassword(passwordName) {
  const passwordObject = await findPasswordByName(passwordName);
  if (passwordObject) {
    const passwordValue = passwordObject.value;
    const passwordBytes = CryptoJS.AES.decrypt(
      passwordValue,
      process.env.MASTERPW
    );
    return passwordBytes.toString(CryptoJS.enc.Utf8);
  } else {
    return undefined;
  }
}

// CREATE ONE

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    process.env.MASTERPW
  ).toString();

  await collection("passwords").insertOne({
    name: passwordName,
    value: encryptedValue,
  });
}

// DELETE ONE

async function deletePassword(passwordName) {
  await collection("passwords").deleteOne({
    name: passwordName,
  });
}

exports.connect = connect;
exports.close = close;
exports.collection = collection;
exports.findPasswordByName = findPasswordByName;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.deletePassword = deletePassword;
