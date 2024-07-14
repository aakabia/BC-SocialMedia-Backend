const connection = require("../config/connection");
const seedUserData = require("./user");

// Above, we import our connection and our seed function for users.

connection.on("error", (err) => err);

// Above, is to check if any connection errros occur while connecting to our db

connection.on("connected", () => {
  console.log("Mongoose connected to social_network_db");
});

// Above is to let us know we are connected to our db

connection.once("open", async () => {
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }
  // Above, we check if " users collection exists and if it does we drop it."
  await seedUserData();

  // Above, we seed our db if no users collection exists

  console.info("Seeding complete! 🌱");
  process.exit(0);

  // Above, we log seeding complete and exit our current process.
});
