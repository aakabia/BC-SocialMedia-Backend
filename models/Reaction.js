const { Schema, Types } = require("mongoose");

// Above,  we import schema and Types from mongoose.

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    // Above, is a custom id named reactionId

    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },

    userName: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // Above, we set the date by default
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Above is our reaction schema 
// Reaction will not be a  model of its own but instead be embedded into another model. 
// See Thought.js



module.exports = reactionSchema;

// Above, we export reactionSchema.

