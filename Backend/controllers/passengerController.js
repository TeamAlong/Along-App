const geolocation = require("node-geolocation");
const os = require("os");

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Iterate over network interfaces to find IPv4 address
let ipAddress;
Object.keys(networkInterfaces).forEach((interfaceName) => {
  const networkInterface = networkInterfaces[interfaceName];
  networkInterface.forEach((iface) => {
    // Skip over non-IPv4 addresses and loopback interface
    if (iface.family === "IPv4" && !iface.internal) {
      ipAddress = iface.address;
    }
  });
});

console.log("IP Address:", ipAddress);

// Call the `getLocation` function provided by node-geolocation
geolocation.getCurrentPosition(ipAddress, (err, location) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }

  console.log("Location:", location);
});
