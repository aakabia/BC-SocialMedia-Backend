const { User,Thoughts } = require("../models");
const {thoughts, seedThoughtData} = require("./thought")
const mongoose = require("mongoose");

// Above, we import our user model and our mongoose package
// Above, we also require our seed thought function and thoughts array

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

    // Above, we create our two arrays in the database.

    
    const newThoughts = await Thoughts.insertMany(thoughts)
    // Above, we create our thoughts in the database.


    
    const newUsersWithThoughts = await seedThoughtData(newUsers, newThoughts);
    const newUsersWithFriendsAndThoughts = await seedThoughtData(newUsersWithFriends,newThoughts);
    // Above, we seed the thought data to each new user with the seedsThoughtdata function.










    newUsersWithThoughts[0].friends.push(newUsersWithFriendsAndThoughts[0]._id);
    newUsersWithThoughts[1].friends.push(newUsersWithFriendsAndThoughts[0]._id);
    newUsersWithThoughts[2].friends.push(newUsersWithFriendsAndThoughts[1]._id);

    // Above, we assign friendships to the newusers that were not created with friends

    await Promise.all([
      newUsersWithThoughts[0].save(),
      newUsersWithThoughts[1].save(),
      newUsersWithThoughts[2].save(),
    ]);

    
    // Above, we save the updates to those entries

    console.log("Added friendships to seeded Data!");

    // Above, lets us know that the seeding was successfull!
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error; // Propagate the error for further handling
  }
};

// Above is our function to bulkcreate our user data with our new hashed pw.

module.exports = seedUserData;

// Above, we export our seedUserData function
