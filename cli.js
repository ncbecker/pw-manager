require("dotenv").config();
const chalk = require("chalk");
const kleur = require("kleur");
const { askForMasterPassword, askForCRUD } = require("./lib/questions");
const { connect, close } = require("./lib/database");
const { readEntry } = require("./lib/readEntry");
const { createNewEntry } = require("./lib/newEntry");
const { deleteExistingEntry } = require("./lib/deleteEntry");
const { updateExistingEntry } = require("./lib/updateEntry");

async function run() {
  try {
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
        await updateExistingEntry();
        break;
      case "DELETE":
        await deleteExistingEntry();
        break;
    }
  } catch (error) {
    if (error.message.match("E11000")) {
      console.error("DUPLICATE KEY JO!");
    } else {
      console.error(error);
    }
  } finally {
    await close();
    console.log(chalk.magenta("Connection to database closed!"));
  }
}

run();
