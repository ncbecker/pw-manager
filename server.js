require("dotenv").config();
const chalk = require("chalk");
const kleur = require("kleur");
const express = require("express");
const path = require("path");
const {
  connect,
  getPassword,
  deletePassword,
  getAllPasswords,
  setPassword,
} = require("./lib/database");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3600;

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
  const password = request.body;
  try {
    await setPassword(password.name, password.value);
    response.send(`Successfully set password for ${password.name}`);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.delete("/api/passwords/:passwordName", async (request, response) => {
  const { passwordName } = request.params;
  try {
    const result = await deletePassword(passwordName);
    if (result.deletedCount === 0) {
      return response.status(404).send("Couldn't find password");
    }
    response.status(200).send(`${passwordName} got deleted!`);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
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
