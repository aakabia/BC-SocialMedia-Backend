const router = require("express").Router();
const { User } = require("../../models");
const mongoose = require("mongoose");

// Important! ,  we have to use object deconstructing to get models or refernce the file directly.

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      .select("-__v");

    // Above, we get all the users with .find
    // .populate allows us to include the thoughts and frends keys in the response.
    // the select keys and .select allow us top exclude the mongoos -__V from the output.

    if (!users) {
      return res.status(404).json({ message: "No users data found" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json(err);

    // Above, is how we send our response
  }
});
// Above, we get all users

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    // Above, ensures the ID is a valid mongoose ObjectId

    const user = await User.findById(req.params.id)
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      .select("-__v");
    // .findOne allows us to find one user with a matching id.

    if (!user) {
      return res.status(404).json({ message: "No user found with that id" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Above, we get one user.

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    // Above, we create a new user with the req body.

    if (!newUser) {
      return res
        .status(404)
        .json({ message: "Error: new user could not be created." });
    }

    // Above is to check if our new user is created.

    res.json({ message: "User created!" });
    // Above is our response once a user a created.
  } catch (err) {
    console.error(err);
  }
});

// Above, we create a new user.

router.put("/", async (req, res) => {
  try {
    if (!req.body._id) {
      return res.status(404).json({
        message: "Error: A user id needed to update a user!",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.body._id },

      {
        $set: { userName: req.body.userName, email: req.body.email },
        $push: { friends: { $each: req.body.friends } },

        // Above, we update the username and email from the req.body with set.
        // Also, we update the friends array  with push and each in order to add multiple freinds at once.
      },

      { new: true } // return the updated document
    );

    // Above, we create a new user with the req body.

    if (!updatedUser) {
      return res.status(404).json({ message: "Error: No user updated." });
    }

    // Above is to check if our user is updated.

    res.json({ message: "User update Successfull!" });
    // Above is our response once a user is updated.
  } catch (err) {
    console.error(err);
  }
});

// Above, we update a user.

router.delete("/friends", async (req, res) => {
  try {
    if (!req.body._id && req.body.friendId) {
      return res.status(404).json({
        message: "Error: A user and friend id is needed to delete a reaction!",
      });
    }

    const user = await User.findOne({ _id: req.body._id });
    // Above, we find the user to check if friendId is in the friends array
    if (!user) {
      return res.status(404).json({ message: "Error: User not found." });
    }

    if (!user.friends.includes(req.body.friendId)) {
      return res
        .status(404)
        .json({ message: "Error: Friend not found in user’s friends list." });
    }
    // Above, we Check if the friendId is in the friends array
    // We can use includes here because the friends array includes only objects with primitve values of friendId's.

    const deletedFriend = await User.findOneAndUpdate(
      { _id: req.body._id },

      { $pull: { friends: req.body.friendId } },
      // Above, we update the user.
      // We use pull to delete from the reactions array.

      { new: true }
    );

    // Above, we delete a reaction with the req.body.

    if (!deletedFriend) {
      return res.status(404).json({ message: "Error: No friends deleted." });
    }

    // Above is to check if our reaction is updated.

    res.json({ message: "Friend delete Successfull!" });
    // Above is our response once a reaction is deleted.
  } catch (err) {
    console.error(err);
  }
});
// Abve, we delete a friend.

router.delete("/", async (req, res) => {
  try {
    if (!req.body._id) {
      return res.status(404).json({
        message: "Error: A user id is needed to delete a user!",
      });
    }

    const user = await User.findOne({ _id: req.body._id });

    if (!user) {
      return res.status(404).json({ message: "Error: User not found." });
    }
    // Above, we check if the user exists before delete.

    const deletedUser = await User.deleteOne({});

    // Above, we delete a reaction with the req.body.

    if (!deletedUser) {
      return res.status(404).json({ message: "Error: No Thought deleted." });
    }

    // Above is to check if our reaction is updated.

    res.json({ message: "User delete Successfull!" });
    // Above is our response once a reaction is deleted.
  } catch (err) {
    console.error(err);
  }
});

// Above, we delete a user.

// noteToSelf: When using mongoose be aware of arrays with primitve values only or objects.
// We have to acess them in different ways.
// See "$pull" in delete route for reactions in thoughtRoutes vs "pull" in delete route for friends in UserRoutes.

module.exports = router;

// Above, we export our router.
