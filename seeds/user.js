const { User } = require("../models");
const mongoose = require("mongoose");

// Above, we import our user model and our mongoose package

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "alice",
    email: "alice@example.com",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "bob",
    email: "bob@example.com",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "carol",
    email: "carol@example.com",
  },
];

// Above, we create a array of users and use the Types object id to give them a id.

const userWithFriends = [
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "aakabia",
    email: "ziz@example.com",
    friends: [users[0]._id, users[1]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userName: "solo",
    email: "solo@example.com",
    friends: [users[2]._id],
  },
];

// Above, we create a users with friends array and assign id's to them as well

const seedUserData = async () => {
  try {
    const newUsers = await User.insertMany(users);
    const newUsersWithFriends = await User.insertMany(userWithFriends);

    // Above, we crate our two arrays in the database

    newUsers[0].friends.push(newUsersWithFriends[0]._id);
    newUsers[1].friends.push(newUsersWithFriends[0]._id);
    newUsers[2].friends.push(newUsersWithFriends[1]._id);

    // Above, we assign friendships to the newusers that were not created with friends

    await Promise.all([
      newUsers[0].save(),
      newUsers[1].save(),
      newUsers[2].save(),
    ]);

    
    // Above, we save the updates to those entries

    console.log("Seeded data inserted with friendships");

    // Above, lets us know that the seeding was successfull!
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error; // Propagate the error for further handling
  }
};

// Above is our function to bulkcreate our user data with our new hashed pw.

module.exports = seedUserData;

// Above, we export our seedUserData function
