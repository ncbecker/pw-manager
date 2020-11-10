// require similar to import

const chalk = require("chalk");
const inquirer = require("inquirer");

console.log("PW-Manager");

const args = process.argv.slice(2);

console.log(args);

const passwordName = args[0];

const secretMasterPassword = "helloworld";

const questions = [
  {
    type: "input",
    name: "masterPassword",
    message: "What is the super secret master password?",
  },
];

// instead of ".then" we can use async function and await

async function validateAccess() {
  // await object "answers" is destructured; note: to access object properties you can use answers["name"] or answers.name
  const { masterPassword } = await inquirer.prompt(questions);

  if (masterPassword !== secretMasterPassword) {
    console.error(chalk.red("You are not welcome here! 👿"));
    validateAccess();
    // return is needed since function is async; otherwise the function wouldn't be called immediately
    return;
  }

  if (passwordName === "Nico") {
    console.log(chalk.green("Password is honigblume"));
  } else {
    console.log(chalk.yellow("Unknown password"));
  }
}

validateAccess();
