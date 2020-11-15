const { getPassword } = require("./database");
const { askReadOneOrAll, askPasswordName } = require("./questions");
const chalk = require("chalk");

async function readEntry() {
  const answerReadOneOrAll = await askReadOneOrAll();
  switch (answerReadOneOrAll) {
    case "READ SINGLE PW":
      const answerPasswordName = await askPasswordName();
      const passwordValue = await getPassword(answerPasswordName);
      if (passwordValue) {
        console.log("Your password is:", chalk.green(passwordValue));
      } else {
        console.log(chalk.yellow("❌Does not exist in database!❌"));
      }
      break;
    case "READ ALL PW":
      console.log("Read ALL");
      break;
  }
}

exports.readEntry = readEntry;
