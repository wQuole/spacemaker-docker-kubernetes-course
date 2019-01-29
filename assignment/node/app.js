const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("This is a request");
  res.json([
    { x: 0, y: 0, dx: 20, dy: 20, dz: 20 },
    { x: 40, y: 40, dx: 20, dy: 20, dz: 40 }
  ]);
});

module.exports = app;
