const fs = require("fs").promises;

async function readMasterPassword() {
  return await fs.readFile("./.masterPassword", "utf-8");
}

exports.readMasterPassword = readMasterPassword;
