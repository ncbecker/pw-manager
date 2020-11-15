const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { answerMasterPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "answerMasterPassword",
      message: "What is the super secret master password?",
    },
  ]);
  return answerMasterPassword;
}

async function askForCRUD() {
  const { answerCRUD } = await inquirer.prompt([
    {
      type: "list",
      name: "answerCRUD",
      message: "Please choose a CRUD:",
      choices: ["CREATE", "READ", "UPDATE", "DELETE"],
    },
  ]);
  return answerCRUD;
}

async function askReadOneOrAll() {
  const { answerReadOneOrAll } = await inquirer.prompt([
    {
      type: "list",
      name: "answerReadOneOrAll",
      message: "ONE or ALL?",
      choices: ["READ SINGLE PW", "READ ALL PW"],
    },
  ]);
  return answerReadOneOrAll;
}

async function askPasswordName() {
  const { answerPasswordName } = await inquirer.prompt([
    {
      type: "input",
      name: "answerPasswordName",
      message: "Which password did you forget? 🤯",
    },
  ]);
  return answerPasswordName;
}

async function askNewTitle() {
  const { answerNewTitle } = await inquirer.prompt([
    {
      type: "input",
      name: "answerNewTitle",
      message: "Title? 👻",
    },
  ]);
  return answerNewTitle;
}

async function askNewPassword() {
  const { answerNewPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "answerNewPassword",
      message: "Password? 🕵️‍♂️",
    },
  ]);
  return answerNewPassword;
}

async function askDeletePassword() {
  const { answerDeletePassword } = await inquirer.prompt([
    {
      type: "input",
      name: "answerDeletePassword",
      message: "Which password do you want to delete? 🗑",
    },
  ]);
  return answerDeletePassword;
}

async function askUpdatePassword() {
  const { answerUpdatePassword } = await inquirer.prompt([
    {
      type: "input",
      name: "answerUpdatePassword",
      message: "Which password do you want to update? ♻️",
    },
  ]);
  return answerUpdatePassword;
}

exports.askForMasterPassword = askForMasterPassword;
exports.askForCRUD = askForCRUD;
exports.askReadOneOrAll = askReadOneOrAll;
exports.askPasswordName = askPasswordName;
exports.askNewTitle = askNewTitle;
exports.askNewPassword = askNewPassword;
exports.askDeletePassword = askDeletePassword;
exports.askUpdatePassword = askUpdatePassword;
