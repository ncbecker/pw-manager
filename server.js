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
  const passwordValue = await getPassword(name);
  response.send(passwordValue);
});

app.get("/api/passwords", async (request, response) => {
  const passwordNames = await getAllPasswords();
  response.send(passwordNames);
});

app.post("/api/passwords", (request, response) => {
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
