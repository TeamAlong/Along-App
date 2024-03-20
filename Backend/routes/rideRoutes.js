const express = require("express");
const rideController = require("./../controllers/rideController");
//const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route("/rides-within/:distance/center/:latlng/unit/:unit")
  .get(rideController.getDriversWithin);
// /tour-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route("/distances/:latlng/unit/:unit").get(rideController.getDistances);

module.exports = router;
