const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config({ path: "./.env.local" });

const app = express();
app.use(cors());

app.get("/api/status/health", (_, res) => {
  res.sendStatus(200);
});

app.get("/api/status", (_, res, next) => {
  const data = {};
  axios
    .get(`${process.env.LIGHTS_SERVICE}/api/lights`)
    .then(({ data: lightsData }) => {
      data.lighting = { status: true, lights: lightsData.lights };
      console.log(data);
    })
    .catch(() => {
      data.lighting = { status: false };
    })
    .then(() => {
      return axios.get(`${process.env.HEATING_SERVICE}/api/heating`);
    })
    .then(({ data: heatingData }) => {
      data.heating = { status: true, ...heatingData };
    })
    .catch(() => {
      data.heating = { status: false };
    })
    .finally(() => {
      res.status(200).send(data);
    });
});

module.exports = app;
