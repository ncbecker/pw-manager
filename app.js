// require similar to import

const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs").promises;

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
    message: "Type in GET or SAVE to choose",
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
      console.log(chalk.green(passwordSafe[passwordName]));
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

const questionNewTitle = [
  {
    type: "input",
    name: "answerTitle",
    message: "Title?",
  },
];

const questionNewPassword = [
  {
    type: "input",
    name: "answerPassword",
    message: "Password?",
  },
];

async function createNewEntry() {
  const { answerTitle } = await inquirer.prompt(questionNewTitle);
  const { answerPassword } = await inquirer.prompt(questionNewPassword);
  return { [answerTitle]: answerPassword };
}

validateAccess();
