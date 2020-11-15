const chalk = require("chalk");
const { askUpdatePassword, askNewPassword } = require("./questions");
const { updatePassword, findPasswordByName } = require("./database");

async function updateExistingEntry(secretMasterPassword) {
  const answerUpdatePassword = await askUpdatePassword();
  const passwordObject = await findPasswordByName(answerUpdatePassword);
  if (passwordObject) {
    const answerNewPassword = await askNewPassword();
    await updatePassword(answerUpdatePassword, answerNewPassword);
    console.log(chalk.green("UPDATED 🚀"));
  } else {
    console.log(chalk.yellow("❌Does not exist in database!❌"));
  }
}

exports.updateExistingEntry = updateExistingEntry;
