// console.log("Hello World");

// console.log("PW-Manager");

// console.log(process.argv);

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

const args = process.argv.slice(2);

console.log(args);

const passwordName = args[0];

// console.log(`You want to know the password of '${passwordName}'`);

// if (passwordName === "Nico") {
//   console.log("Password is honigblume");
// } else {
//   console.log("Unknown");
// }

const inquirer = require("inquirer");

let questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "input",
    name: "password",
    message: "What's your password?",
  },
];

inquirer.prompt(questions[0]).then((answers) => {
  console.log(`Hi ${answers["name"]}!`);
  inquirer.prompt(questions[1]).then((answers) => {
    if (answers["password"] === "helloworld") {
      console.log("Happy hacking!");
    } else {
      console.log("Wrooong!");
    }
  });
});
