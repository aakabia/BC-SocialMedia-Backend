const { Schema, model } = require("mongoose");
const Reactions = require('./Reaction');


// Above,  we import schema and model from mongoose.
// Also, we import our Reactions Schema.

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },

    

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // Above, we set the date by default 

    userName: {
      type: String,
      required: true,
    },

    reactions: [Reactions],
    // Above, we embed the reactions schema into the thoughts model.
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Above is our thought schema.


thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
});

// Above, is a virtual that returns the reactions length.


const Thoughts = model('Thoughts', thoughtSchema);

// ABove, we, initialize our thought model


module.exports = Thoughts;

// Above, we export Thoughts.
