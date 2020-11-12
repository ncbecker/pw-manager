const { askNewTitle, askNewPassword } = require("./questions");
const { encryptData } = require("./crypto");

async function createNewEntry(secretMasterPassword) {
  const answerNewTitle = await askNewTitle();
  const answerNewPassword = await askNewPassword();
  const encryptPassword = encryptData(answerNewPassword, secretMasterPassword);
  return { [answerNewTitle]: encryptPassword };
}

exports.createNewEntry = createNewEntry;
