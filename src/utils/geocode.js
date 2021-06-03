const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicHJhdGVla3Jvc2hhbiIsImEiOiJja29jdzh4c2EyZ21zMm9zMnNpcmNrNjhwIn0.QOSPz-xCJ78UMGmHIy9vBg";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to load services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to load services", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
