const mongoose = require("mongoose");

// Above, we import mongoose.

const thoughts = [
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Hello there Friend!",
    userName: "alice",
    reactions:[ {
    
      reactionBody: " Hello Back friend!",
      userName: "bob",
    },
  
  
  ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " What is 2+2 ?",
    userName: "alice",
    reactions:[ {
    
      reactionBody: "I think 2 + 2 is 4 alice :)",
      userName: "aakabia",
    },

    {
    
      reactionBody: "yea Im pretty sure its 4 lol!",
      userName: "solo",
    },
  ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: "My favorite language is js!",
    userName: "bob",
    reactions:[
      {
    
        reactionBody: " HTML, CSS and JS trifecta.",
        userName: "carol",
      },
      {
        
        reactionBody: " Python is pretty dope too!",
        userName: "alice",
      },

    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Does anyone know a good tutor?",
    userName: "solo",
    reactions:[
      {
        reactionBody: "Yea Wyznat is a good tutor site",
        userName: "aakabia",
      },
      {
        
        reactionBody: "My bootcamp has great tutors also.",
        userName: "carol",
      },

    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Does anyone here like anime?",
    userName: "aakabia",
    reactions:[
      {
    
        reactionBody: "JJK All day!",
        userName: "alice",
      },
      {
        
        reactionBody: "Naruto has to be the best yet.",
        userName: "aakabia",
      },
      {
        
        reactionBody: "All these answers are false, Bleach is the Best anime ever!",
        userName: "bob",
      },


    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: "Game of thrones rocks!",
    userName: "carol",
    reactions:[
      {
    
        reactionBody: "I really like the new Series ",
        userName: "alice",
      },
      {
        
        reactionBody: "House of dragons doesnt feel the same.",
        userName: "aakabia",
      },
      {
        
        reactionBody: "Team Black All day!",
        userName: "solo",
      },
      
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: " Where can I buy a new Motorcycle?",
    userName: "aakabia",
    reactions:[
      {
    
        reactionBody: "My buddy is actually selling his Honda CBR, I can send over his email! ",
        userName: "bob",
      },
      {
        
        reactionBody: "Thanks I would really appreciate it! ",
        userName: "aakabia",
      },
      
    ],
  },
];

// Above, is the thought data we will be seeding 
// We add in a reactions objects for the reactions array. 

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