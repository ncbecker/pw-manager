const fs = require("fs").promises;
const chalk = require("chalk");
const {
  askForMasterPassword,
  askGetOrSave,
  askPasswordName,
} = require("./lib/questions");
const { createNewEntry } = require("./lib/newentry");
const { decryptData } = require("./lib/crypto");

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
