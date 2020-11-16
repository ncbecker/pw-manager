require("dotenv").config();
const chalk = require("chalk");
const kleur = require("kleur");
const express = require("express");
const {
  connect,
  getPassword,
  deletePassword,
  getAllPasswords,
} = require("./lib/database");

const app = express();
const port = 3600;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      response
        .status(404)
        .send("Could not find the password you have specified");
      return;
    }
    response.send(passwordValue);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

app.get("/api/passwords", async (request, response) => {
  const passwordNames = await getAllPasswords();
  response.send(passwordNames);
});

app.post("/api/passwords", async (request, response) => {
  response.send("Under construction");
});

app.delete("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  await deletePassword(name);
  response.send(name + "deleted");
});

async function run() {
  console.log(kleur.bgYellow(chalk.magenta("PW-Manager")));
  console.log(chalk.magenta("Connecting to database..."));
  await connect(process.env.DB_URL, process.env.DB_NAME);
  console.log(chalk.magenta("Connected to database 🎉"));

  app.listen(port, () => {
    console.log(`PW-Manager API listening at http://localhost:${port}`);
  });
}

run();
