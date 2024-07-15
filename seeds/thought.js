const { User,Thoughts } = require("../models");
const mongoose = require("mongoose");

// Above, we import mongoose, User and Thoughts.

const thoughts = [
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Hello there Friend!",
    userName: "alice",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " What is 2+2 ?",
    userName: "alice",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: "My favorite language is js!",
    userName: "bob",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Does anyone know a good tutor?",
    userName: "solo",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Does anyone here like anime?",
    userName: "aakabia",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: "Game of thrones rocks!",
    userName: "carol",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Where can I buy a new Motorcycle?",
    userName: "aakabia",
  },
];

// Above, is the thought data we will be seeding 

const seedThoughtData = async (arr,thoughts) => {
    try {
      
        arr.forEach(item => {
           thoughts.forEach(thought=>{
            if(thought.userName === item.userName){
                item.thoughts.push(thought);
                
            }

           })
        });

        // Above, is a nested loop that checkes for matches in usernames between the two arrays.

        await Promise.all(arr.map(user => user.save()));

        // Above we save each update to the array.

      console.log("Seeded thought data for each user!");
        return arr
      // Above, lets us know that the seeding was successfull and we return the new array!

    } catch (error) {
      console.error("Error seeding users:", error);
      throw error; // Propagate the error for further handling
    }
};

module.exports = {thoughts, seedThoughtData};

// Above, we export our thoughts array and our seedThoughtData function.