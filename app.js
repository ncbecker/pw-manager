const chalk = require("chalk");
const kleur = require("kleur");
const { askForMasterPassword, askForCRUD } = require("./lib/questions");
const { connect, close } = require("./lib/database");
const { readEntry } = require("./lib/readEntry");
const { createNewEntry } = require("./lib/newEntry");
require("dotenv").config();

async function run() {
  console.log(kleur.bgYellow(chalk.magenta("PW-Manager")));
  console.log(chalk.magenta("Connecting to database..."));

  await connect(process.env.DB_URL, process.env.DB_NAME);

  console.log(chalk.magenta("Connected to database 🎉"));

  const secretMasterPassword = process.env.MASTERPW;

  const answerMasterPassword = await askForMasterPassword();

  if (answerMasterPassword !== secretMasterPassword) {
    console.error(chalk.red("You are not welcome here! 👿"));
    return run();
  }

  const answerCRUD = await askForCRUD();

  switch (answerCRUD) {
    case "CREATE":
      await createNewEntry(process.env.MASTERPW);
      break;
    case "READ":
      await readEntry();
      break;
    case "UPDATE":
      console.log("Update");
      break;
    case "DELETE":
      console.log("Delete");
      break;
  }

  await close();

  console.log(chalk.magenta("Connection to database closed!"));
}

run();
