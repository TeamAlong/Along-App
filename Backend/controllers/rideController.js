const multer = require("multer");
const sharp = require("sharp");
const Ride = require("../models/rideModel");
const Driver = require("../models/driverModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
// const factory = require("./handlerFactory");

// GET ride start location

// GET ride end location
exports.getDriversWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng)
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat, lng",
        400
      )
    );

  console.log(distance, lat, lng, unit);
  const drivers = await Driver.find({
    locations: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lat, lng],
        },
        $maxDistance: radius,
        $minDistance: 10,
      },
    },
  });

  res.status(200).json({
    status: "success",
    results: drivers.length,
    data: {
      data: drivers,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat, lng",
        400
      )
    );
  }

  const distances = await Driver.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  console.log(lat, lng);

  res.status(200).json({
    status: "success",
    data: {
      data: distances,
    },
  });
});
