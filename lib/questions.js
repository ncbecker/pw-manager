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

async function askGetOrSave() {
  const { answerSaveOrGet } = await inquirer.prompt([
    {
      type: "list",
      name: "answerSaveOrGet",
      message: "Please choose: SAVE or GET a password?",
      choices: ["SAVE", "GET"],
    },
  ]);
  return answerSaveOrGet;
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
      message: "Title?",
    },
  ]);
  return answerNewTitle;
}

async function askNewPassword() {
  const { answerNewPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "answerNewPassword",
      message: "Password?",
    },
  ]);
  return answerNewPassword;
}

exports.askForMasterPassword = askForMasterPassword;
exports.askGetOrSave = askGetOrSave;
exports.askPasswordName = askPasswordName;
exports.askNewTitle = askNewTitle;
exports.askNewPassword = askNewPassword;
