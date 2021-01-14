/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
var myArgs = process.argv.slice(2);
let url = myArgs[0]
const request = require('request');


const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  let url = "https://api.ipify.org/?format=json"
  request(url, (error, response, body) => {
    //console.log('error:', error); // Print the error if one occurred
    if (!error){
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
          }
        const data = JSON.parse(body);
        if (data.length === 0){
            return callback(error,null)
        }
        else{
            console.log(data.ip)
            return callback(null,data.ip)
        }
 
    }
})

}



const fetchCoordsByIP = function(ip,callback) { 
    // use request to fetch IP address from JSON API
    let url = "https://freegeoip.app/json/" + ip
    request(url, (error, response, body) => {
      //console.log('error:', error); // Print the error if one occurred
      if (!error){
          if (response.statusCode !== 200) {
              const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
              return callback(Error(msg), null);
            }
          const data = JSON.parse(body);
          if (data.length === 0){
              return callback(error,null)
          }
          else{
            let retcoord = {}
            retcoord.lat = data.latitude
            retcoord.long = data.longitude
            console.log(retcoord)
            return callback(null,retcoord)
          }
   
      }
  })
  
  }


  /**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
    // ...

    let url = "http://api.open-notify.org/iss-pass.json?lat=" + coords["lat"].toString() + "&lon=" + coords["long"].toString()
    request(url, (error, response, body) => {
      //console.log('error:', error); // Print the error if one occurred
      if (!error){
          if (response.statusCode !== 200) {
              const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
              return callback(Error(msg), null);
            }
          const data = JSON.parse(body);
          if (data.length === 0){
              return callback(error,null)
          }
          else{
            return callback(null,data.response)
          }
   
      }
  })

  };

  

  
// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
    // empty for now

    fetchMyIP((error, ip) => {
        if (error) {
          return callback(error, null);
        }
    
        fetchCoordsByIP(ip, (error, loc) => {
          if (error) {
            return callback(error, null);
          }
    
          fetchISSFlyOverTimes(loc, (error, nextPasses) => {
            if (error) {
              return callback(error, null);
            }
    
            callback(null, nextPasses);
          });
        });
      });
    };
    

//module.exports = { fetchMyIP ,fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation};
module.exports = { nextISSTimesForMyLocation};