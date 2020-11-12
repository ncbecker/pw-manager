// require similar to import

const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

console.log(chalk.magenta("PW-Manager"));

const secretMasterPassword = "helloworld";

const questionMasterPassword = [
  {
    // type password for hidden input
    type: "password",
    name: "masterPassword",
    message: "What is the super secret master password?",
  },
];

const questionPasswordName = [
  {
    type: "input",
    name: "passwordName",
    message: "Which password did you forget?",
  },
];

const questionGetOrSave = [
  {
    type: "list",
    name: "answerGetOrSave",
    message: "Please choose: SAVE or GET a password?",
    choices: ["SAVE", "GET"],
  },
];

// instead of ".then" we can use async function and await

async function validateAccess() {
  // await object "answers" is destructured; note: to access object properties you can use answers["name"] or answers.name
  const { masterPassword } = await inquirer.prompt(questionMasterPassword);

  if (masterPassword !== secretMasterPassword) {
    console.error(chalk.red("You are not welcome here! 👿"));
    validateAccess();
    // return is needed since function is async; otherwise the function wouldn't be called immediately
    return;
  }

  const { answerGetOrSave } = await inquirer.prompt(questionGetOrSave);

  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  const passwordSafe = JSON.parse(passwordSafeJSON);

  if (answerGetOrSave === "GET") {
    const { passwordName } = await inquirer.prompt(questionPasswordName);

    const passwordSafeKeys = Object.keys(passwordSafe);

    // Alternative: if(passwordSafe[passwordName]); returns true if value exists; Object.keys not necessary
    if (passwordSafeKeys.includes(passwordName)) {
      const decryptPassword = decryptData(
        passwordSafe[passwordName],
        secretMasterPassword
      );
      console.log(chalk.green(decryptPassword));
    } else {
      console.log(chalk.yellow("Does not exist in database!"));
    }
  } else if (answerGetOrSave === "SAVE") {
    const newEntry = await createNewEntry();
    const newPasswordSafe = Object.assign(passwordSafe, newEntry);
    const data = JSON.stringify(newPasswordSafe);

    await fs.writeFile("./db.json", data);

    console.log(chalk.green("SAVED 🚀"));
  } else {
    console.log("RESTART");
  }
}

// Question prompt for new entries

const questionNewTitle = [
  {
    type: "input",
    name: "answerTitle",
    message: "Title?",
  },
];

const questionNewPassword = [
  {
    type: "password",
    name: "answerPassword",
    message: "Password?",
  },
];

async function createNewEntry() {
  const { answerTitle } = await inquirer.prompt(questionNewTitle);
  const { answerPassword } = await inquirer.prompt(questionNewPassword);
  const encryptPassword = encryptData(answerPassword, secretMasterPassword);
  return { [answerTitle]: encryptPassword };
}

// crypto-js

function encryptData(data, password) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
}
function decryptData(data, password) {
  const bytes = CryptoJS.AES.decrypt(data, password);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

validateAccess();
