const stripe = require("stripe")(
  "sk_test_51IHjX1G4gFQJRsYlvFM5VUO1w7WyVyBsMjwZAgkXMmzQ845lGHarJp00kgtxzl9fTcihqHpL2zr0tkAvJnsyYUqH00QtmFeQuX"
);
require("dotenv").config();

const YOUR_DOMAIN = "http://localhost:4000";

const app = require("./app");
require("./database");

async function main() {
  await app.listen(app.get("port"));
  console.log(`Server on port: ${app.get("port")}`);
}

main();
