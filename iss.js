const request = require('request');

const fetchMyIp = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);

    } else {
      data = JSON.parse(body);
      return callback(null, data.ip);
    }
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      return callback(Error(msg), null);

    } else {
      let data = JSON.parse(body);

      return callback(null, {latitude: data.latitude, longitude: data.longitude});
    }
  })
}


const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
  
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching data. Response: ${body}`;
      return callback(Error(msg), null);

    } else {
      let data = JSON.parse(body).response;
      return callback(null, data);
    }
  })
}

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextTime) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextTime);
      })
    })
  })
}

module.exports = {fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};