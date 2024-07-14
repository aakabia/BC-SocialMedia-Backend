const { Schema, model } = require("mongoose");

// Above,  we import schema and model from mongoose.


const userSchema = new Schema(
  {
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // Above we initiate a new schema and add properties with sub properties 

    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        // Note: match makes sure the input natches the regex in the array or the message " Please enter Valid e-mail address will display. "
        // trim, trims the whitspace of the input 
        // unique, makes sure the entry is unique in the db
    },
    

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],

    //  Above, thoughts is a refernce to the Thoughts model 

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Above, friends is a reference to the user model itself.
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
});

// Above, is a virtual that retrieves the friend count from the friends array length.



  
const User = model('User', userSchema);

// ABove, we, initialize our User model


module.exports = User;

// Above, we export the user model
