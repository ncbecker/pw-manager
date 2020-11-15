const chalk = require("chalk");
const { askDeletePassword } = require("./questions");
const { deletePassword, findPasswordByName } = require("./database");

async function deleteExistingEntry(secretMasterPassword) {
  const answerDeletePassword = await askDeletePassword();
  const passwordObject = await findPasswordByName(answerDeletePassword);
  if (passwordObject) {
    await deletePassword(answerDeletePassword);
    console.log(chalk.green("DELETED 🚀"));
  } else {
    console.log(chalk.yellow("❌Does not exist in database!❌"));
  }
}

exports.deleteExistingEntry = deleteExistingEntry;
