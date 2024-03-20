// exports.getDriversWithin = catchAsync(async (req, res, next) => {
//     const { distance, latlng, unit } = req.params;
//     const [lat, lng] = latlng.split(",");

//     const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

//     if (!lat || !lng)
//       next(
//         new AppError(
//           "Please provide latitude and longitude in the format lat, lng",
//           400
//         )
//       );

//     console.log(distance, lat, lng, unit);
//     const drivers = await Driver.find({
//       // locations: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//       locations: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [lng, lat],
//           },
//           $maxDistance: radius,
//           $minDistance: 10,
//         },
//       },
//     });

//     res.status(200).json({
//       status: "success",
//       results: drivers.length,
//       data: {
//         data: drivers,
//       },
//     });
//   });
