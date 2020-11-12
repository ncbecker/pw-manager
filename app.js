const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const chalk = require("chalk");
const {
  askForMasterPassword,
  askGetOrSave,
  askPasswordName,
  askNewTitle,
  askNewPassword,
} = require("./lib/questions");

console.log(chalk.magenta("PW-Manager"));

const secretMasterPassword = "helloworld";

async function run() {
  const masterPassword = await askForMasterPassword();

  if (masterPassword !== secretMasterPassword) {
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
    const newEntry = await createNewEntry();
    const newPasswordSafe = Object.assign(passwordSafe, newEntry);
    const data = JSON.stringify(newPasswordSafe);

    await fs.writeFile("./db.json", data);

    console.log(chalk.green("SAVED 🚀"));
  } else {
    console.log("RESTART");
  }
}

// new entry component

async function createNewEntry() {
  const answerNewTitle = await askNewTitle();
  const answerNewPassword = await askNewPassword();
  const encryptPassword = encryptData(answerNewPassword, secretMasterPassword);
  return { [answerNewTitle]: encryptPassword };
}

// crypto-js component

function encryptData(data, password) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
}
function decryptData(data, password) {
  const bytes = CryptoJS.AES.decrypt(data, password);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

run();
