const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Above we import all our routes and stablish the express router.

router.use("/users",userRoutes);
router.use("/thoughts",thoughtRoutes);

// Above we label the routes path  to use.



module.exports = router;