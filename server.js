const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
  res.send("Hello, world!");
});

app.listen(port, () => {
  `server start on port ${port}`;
});
