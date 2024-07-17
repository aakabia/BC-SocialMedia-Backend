const router = require("express").Router();
const {User} = require("../../models");

// Important! , with mongoose we have to use object deconstructing to get models or refernce the file directly.


router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate([{path : "thoughts", select: '-__v'  },{path : "friends", select: '-__v' }]).select('-__v');
    res.json(users);
    // Above, we get all the users with .find
    // .populate allows us to include the thoughts and frends keys in the response.
    // the select keys and .select allow us top exclude the mongoos -__V from the output.



  } catch (err) {
    res.status(500).json(err);

    // Above, is how we send our response
  }
});

module.exports = router;

// Above, we export our router.
