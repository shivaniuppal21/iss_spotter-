const { fetchMyIP,fetchCoordsByIP } = require('./iss_promised');

fetchMyIP().then( (body) => {
    console.log(typeof(body))
    console.log(body)
    fetchCoordsByIP(body)
    .then( body => console.log(body))
} )


  

