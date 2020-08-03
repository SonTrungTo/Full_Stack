const express   = require("express");
const {resolve} = require("path");
const zipdb = require("zippity-do-dah");
const ForecastIo = require("forecastio");

const app = express();
const weather = new ForecastIo("");

app.use(express.static(resolve(__dirname, "public")));

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get(/^\/(\d{5})$/, (req, res, next) => {
  let zipInput  = req.params[0];
  let {zipcode, latitude, longitude} = zipdb.zipcode(zipInput);
  if (!zipcode) {
    next();
    return;
  }

  weather.forecast(latitude, longitude, (err, data) => {
    if (err) {
      next();
      return ;
    }

    res.json({
      zipcode,
      temperature: data.currently.temperature
    });
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);
