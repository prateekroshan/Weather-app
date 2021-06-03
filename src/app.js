const { static } = require("express");
const express = require("express");
const { appendFileSync } = require("fs");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialspath);

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "prateek roshan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "prateek roshan",
    title: "About me",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "prateek roshan",
  });
});

// weather page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast: forecastData,
          Location: location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It's raining",
  //   location: "Bhubaneswar",
  //   address: req.query.address,
  // });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "prateek roshan",
    errormessage: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "prateek roshan",
    errormessage: "page not found",
  });
});

//starting the server
app.listen(port, () => {
  console.log("server is running on " + port);
});
