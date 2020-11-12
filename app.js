const fs = require("fs").promises;
const chalk = require("chalk");
const kleur = require("kleur");
const {
  askForMasterPassword,
  askGetOrSave,
  askPasswordName,
} = require("./lib/questions");
const { createNewEntry } = require("./lib/newEntry");
const { decryptData } = require("./lib/crypto");
const { readMasterPassword } = require("./lib/masterPassword");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url =
  "mongodb+srv://ncbecker:EuVztcw4v0TIyoQh@cluster0.lsu6t.mongodb.net/pw-manager?retryWrites=true&w=majority";

// WRITE
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  const db = client.db("pw-manager");

  db.collection("passwords")
    .insertOne({
      name: "gmail",
      value: "mailpassword",
    })
    .then(function (result) {
      // process result
    });
  // client.close();
});

// READ
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  const db = client.db("pw-manager");

  const cursor = db.collection("passwords").find({});

  function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
  }

  function errorFunc(error) {
    console.log(error);
  }

  cursor.forEach(iterateFunc, errorFunc);
  // client.close();
});

console.log(kleur.bgYellow(chalk.magenta("PW-Manager")));

async function run() {
  const secretMasterPassword = await readMasterPassword();

  const answerMasterPassword = await askForMasterPassword();

  if (answerMasterPassword !== secretMasterPassword) {
    console.error(chalk.red("You are not welcome here! 👿"));
    return run();
  }

  const answerSaveOrGet = await askGetOrSave();

  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  const passwordSafe = JSON.parse(passwordSafeJSON);

  if (answerSaveOrGet === "GET") {
    const answerPasswordName = await askPasswordName();

    const passwordSafeKeys = Object.keys(passwordSafe);

    if (passwordSafeKeys.includes(answerPasswordName)) {
      const decryptPassword = decryptData(
        passwordSafe[answerPasswordName],
        secretMasterPassword
      );
      console.log(chalk.green(decryptPassword));
    } else {
      console.log(chalk.yellow("Does not exist in database!"));
    }
  } else if (answerSaveOrGet === "SAVE") {
    const newEntry = await createNewEntry(secretMasterPassword);
    const newPasswordSafe = Object.assign(passwordSafe, newEntry);
    const data = JSON.stringify(newPasswordSafe);

    await fs.writeFile("./db.json", data);

    console.log(chalk.green("SAVED 🚀"));
  } else {
    console.log("RESTART");
  }
}

run();
