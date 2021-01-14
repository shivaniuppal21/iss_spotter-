const { features } = require('process');
const { fetchMyIP,fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation } = require('./iss');

let IP = ""
let Coord = {}
/*
fetchMyIP( (error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  IP = ip
});


fetchCoordsByIP(IP, (error, coord) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! return coord:' , coord);
    Coord.lat =  coord.lat
    Coord.long = coord.long
  });

  // to make sure Coord gets updated before it gets called

  setTimeout(()=>
  fetchISSFlyOverTimes(Coord, (error, response) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! return coord:' , response);
  }) , 1000);

  const { nextISSTimesForMyLocation } = require('./iss');
*/

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
  console.log(passTimes);
  printPassTimes(passTimes)
});