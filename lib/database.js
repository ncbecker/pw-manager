const kleur = require("kleur");
const chalk = require("chalk");
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
    return null;
  }
}

// READ ALL

async function getAllPasswords() {
  const allPasswords = await collection("passwords").find({});
  await allPasswords.forEach((entry) => {
    console.log(kleur.bgWhite(chalk.black(entry.name)));
    const passwordBytes = CryptoJS.AES.decrypt(
      entry.value,
      process.env.MASTERPW
    );
    console.log(passwordBytes.toString(CryptoJS.enc.Utf8));
  });
  return;
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

// UPDATE ONE

async function updatePassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    process.env.MASTERPW
  ).toString();

  await collection("passwords").updateOne(
    {
      name: passwordName,
    },
    { $set: { value: encryptedValue } }
  );
}

// DELETE ONE

async function deletePassword(passwordName) {
  return await collection("passwords").deleteOne({
    name: passwordName,
  });
}

exports.connect = connect;
exports.close = close;
exports.collection = collection;
exports.findPasswordByName = findPasswordByName;
exports.getPassword = getPassword;
exports.getAllPasswords = getAllPasswords;
exports.setPassword = setPassword;
exports.updatePassword = updatePassword;
exports.deletePassword = deletePassword;
