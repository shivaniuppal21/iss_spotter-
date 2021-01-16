const { nextISSTimesForMyLocation } = require('./iss_promised');

/*fetchMyIP().then( (body) => {
    console.log(typeof(body))
    console.log(body)
    fetchCoordsByIP(body)
    .then(body => console.log(body))
    .then(fetchISSFlyOverTimes)
    .then(body => console.log(body));

} )*/

/*fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));*/
  
  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });



  


