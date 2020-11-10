console.log("Hello World");

console.log("PW-Manager");

console.log(process.argv);

const args = process.argv.slice(2);

console.log(args);

const passwordName = args[0];
console.log(`You want to know the password of '${passwordName}'`);

if (passwordName === "Nico") {
  console.log("Password is honigblume");
} else {
  console.log("Unknown");
}
