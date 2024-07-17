const router = require("express").Router();
const {User,Thoughts} = require("../../models")


router.get("/", async (req, res) => {
  try {
    const thoughts = await Thoughts.find()
    // Note: thought cant reference user without a reference in the user schema which we do not have in the thought schema.
    res.json(thoughts);



  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
