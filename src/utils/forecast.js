const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=886579a155804afed1028f77da0fd3cb&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to load weather service at the moement", undefined);
    } else if (body.error) {
      callback(
        "unable to load services!!!Please enter a valid location.",
        undefined
      );
    } else {
      callback(
        undefined,
        `Today's weather is ${body.current.weather_descriptions}.The temperature is around ${body.current.temperature} °C & there is ${body.current.precip} % chance of rain.`
      );
    }
  });
};
module.exports = forecast;
