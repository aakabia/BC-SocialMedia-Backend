const router = require("express").Router();
const { User, Thoughts } = require("../../models");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thoughts.find().select("-__v");
    // Note: thought cant reference user without a reference in the user schema which we do not have in the thought schema.

    if (!thoughts) {
      return res.status(404).json({ message: "No thought data found" });
    }

    // Above is to check if any thoughts exist.

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Above, we get all thoughts.

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    // Above, ensures the ID is a valid mongoose ObjectId

    const thought = await Thoughts.findById(req.params.id).select("-__v");
    // .findOne allows us to find one thought with a matching id.

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that id" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Above, we get one thought.

router.post("/", async (req, res) => {
  try {
    if (!req.body._id && req.body.userName) {
      return res.status(404).json({
        message: "Error: A user id and username is needed to create a thought!",
      });
    }

    // Above is to check that our valuse are in the req body.

    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.status(404).json({ message: "Error: user Not found!" });
    }

    // Above is to check if that user exists.

    const { userName, thoughtText } = req.body;
    const newThought = await Thoughts.create({ userName, thoughtText });

    // Above, we create a new thought.
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.body._id },
      { $push: { thoughts: newThought._id } },
      { new: true } // return the updated document
    );

    // Above, we update a users thoughts array with their new thought..

    if (req.body.userName !== updatedUser.userName) {
      return res.status(404).json({ message: "Error: wrong user request.!" });
    }

    // Above we check that the user in the req.body matches the user we are updating.

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Error: new thought could not be created." });
    }

    // Above, we check if the update is successfull.

    res.json({ message: "Thought created!" });
    // Above is our response.
  } catch (err) {
    console.error(err);
  }
});
// Above, we create a new thought.

router.post("/reactions", async (req, res) => {
  try {
    if (!req.body._id && req.body.userName && req.body.reactionBody) {
      return res.status(404).json({
        message:
          "Error: A thought id , username , and reaction Body is needed to create a thought!",
      });
    }

    // Above is to check that all our valus are in the req body.

    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.status(404).json({ message: "Error: user Not found!" });
    }
    // Above is to make sure we have a user with that username.

    const { userName, reactionBody } = req.body;
    const updatedthought = await Thoughts.findByIdAndUpdate(
      { _id: req.body._id },
      { $push: { reactions: { userName, reactionBody } } },
      { new: true } // return the updated document
    );
    // Above we are updating a thought by its id and pushing in the username and reactionBody from the req body.

    if (req.body.userName !== updatedthought.userName) {
      return res.status(404).json({ message: "Error: wrong users request.!" });
    }
    // Above, makes sure that the username in the body matches the users thought we are trying to update.

    if (!updatedthought) {
      return res
        .status(404)
        .json({ message: "Error: new reaction could not be created." });
    }
    // Above, is to check if the user was updated sucessfully.

    res.json({ message: "Reaction created!" });
    // Above is our response once a reaction is created.
  } catch (err) {
    console.error(err);
  }
});
// Above, we create a new reaction.

router.put("/", async (req, res) => {
  try {
    if (!req.body._id) {
      return res.status(404).json({
        message: "Error: A thought id is needed to update a thought!",
      });
    }

    const updatedthought = await Thoughts.findByIdAndUpdate(
      { _id: req.body._id },

      {
        $set: { thoughtText: req.body.thoughtText },

        // Above, we update the thoughText from the req.body with set.
      },

      { new: true } // return the updated document
    );

    // Above, we create a new user with the req body.

    if (!updatedthought) {
      return res.status(404).json({ message: "Error: No thought updated." });
    }

    // Above is to check if our user is updated.

    res.json({ message: "Thought update Successfull!" });
    // Above is our response once a user is updated.
  } catch (err) {
    console.error(err);
  }
});

router.put("/reactions", async (req, res) => {
  try {
    if (!req.body._id && req.body.reactionId) {
      return res.status(404).json({
        message:
          "Error: A thought and reaction id is needed to update a reaction!",
      });
    }

    const updatedReaction = await Thoughts.findOneAndUpdate(
      { _id: req.body._id, "reactions.reactionId": req.body.reactionId },

      {
        $set: { "reactions.$.reactionBody": req.body.reactionBody },

        // Above, we update the reaction body from the req.body with set.
        // In mongoose we use " " and . notation to access nested schemas.
        // The $ inbetween reasctions and reactionsBody is to ensure we are updating matched reaction.
      },

      { new: true } // return the updated document
    );

    // Above, we update a reaction with the req.body.

    if (!updatedReaction) {
      return res.status(404).json({ message: "Error: No reaction updated." });
    }

    // Above is to check if our reaction is updated.

    res.json({ message: "Reaction update Successfull!" });
    // Above is our response once a reaction is updated.
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
