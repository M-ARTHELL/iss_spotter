const {nextISSTimesForMyLocation} = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`Error occurred: ${error}`);
//     return;
//   } else {
//     return ip;
//   };
// });

// fetchCoordsByIP(ip, (error, coord) => {
//   if (error) {
//     console.log(`Error occurred: ${error}`);
//     return;
//   } else {
//     console.log(`Success! Coords: ${coord}`);
//   }
// });


// const coordinates = { latitude: 46.133333, longitude: -67.65 }

// fetchISSFlyOverTimes(coordinates, (error, result) => {
//   if (error) {
//     console.log(`Error occurred: ${error}`);
//     return;
//   } else {
//     console.log(`Success! Results: ${JSON.stringify(result)}`)
//   }
// })


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});