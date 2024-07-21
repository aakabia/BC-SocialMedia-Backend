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

router.post("/", async (req,res)=>{

  try {
    const newUser = await User.create(req.body);

    // Above, we create a new user with the req body.
    

    if (!newUser) {
      return res
        .status(404)
        .json({ message: 'Error: new user could not be created.' });
    }

    // Above is to check if our new user is created.

    res.json({ message: 'User created!' });
    // Above is our response once a user a created.
  } catch (err) {
    console.error(err);
  }


});

// Above, we create a new user. 










module.exports = router;

// Above, we export our router.
