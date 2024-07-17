const router = require("express").Router();
const apiRoutes = require("./api");

// Above, we stablish our express router and get our routes form the api folder.


router.use("/api", apiRoutes);

// Above, we allow all routes from the api foldier to use /api


router.use((req, res) => {
  return res.send("Wrong route!");
});

// Above is route checker that tells use if we not using a defined route. 
module.exports = router;


