// require similar to import

const chalk = require("chalk");
const inquirer = require("inquirer");

console.log("PW-Manager");

// const args = process.argv.slice(2);

// console.log(args);

// const passwordName = args[0];

const secretMasterPassword = "helloworld";

const passwordSafe = {
  wifi: "password123",
  github: "helloworld",
  vercel: "niceapp",
};

const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "What is the super secret master password?",
  },
  {
    type: "input",
    name: "passwordName",
    message: "Which password did you forget?",
  },
];

// instead of ".then" we can use async function and await

async function validateAccess() {
  // await object "answers" is destructured; note: to access object properties you can use answers["name"] or answers.name
  const { masterPassword, passwordName } = await inquirer.prompt(questions);

  if (masterPassword !== secretMasterPassword) {
    console.error(chalk.red("You are not welcome here! 👿"));
    validateAccess();
    // return is needed since function is async; otherwise the function wouldn't be called immediately
    return;
  }
  const passwordSafeKeys = Object.keys(passwordSafe);
  if (passwordSafeKeys.includes(passwordName)) {
    console.log(chalk.green(passwordSafe[passwordName]));
  } else {
    console.log(chalk.yellow("Does not exist in database!"));
  }
}

validateAccess();
