const chalk = require("chalk");
const { askNewTitle, askNewPassword } = require("./questions");
const { encryptData } = require("./crypto");
const { findPasswordByName, setPassword } = require("./database");

async function createNewEntry(secretMasterPassword) {
  const answerNewTitle = await askNewTitle();
  const passwordObject = await findPasswordByName(answerNewTitle);
  if (passwordObject) {
    console.log(chalk.yellow("Entry already exists!"));
  } else {
    const answerNewPassword = await askNewPassword();
    const encryptedPassword = encryptData(
      answerNewPassword,
      secretMasterPassword
    );
    await setPassword(answerNewTitle, encryptedPassword);
    console.log(chalk.green("SAVED 🚀"));
  }
}

exports.createNewEntry = createNewEntry;
