const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const rateLimit = require("express-rate-limit");
const apicache = require("apicache");
const port = process.env.PORT || 5000;
const app = express();

require("dotenv").config();
let cache = apicache.middleware;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 50,
});
app.use(limiter);
app.set("trust proxy", 1);

app.use(cors({ origin: "*" }));

app.get(":endpoint([\\/\\w\\.-]*)", cache("5 minutes"), function (req, res) {
  const endpoint =
    process.env.API_BASE_URL.replace(/\/$/, "") + req.params.endpoint;

  let params = {};
  params[process.env.API_KEY_PARAM_NAME] = process.env.API_KEY;

  for (const [field, value] of Object.entries(req.query)) {
    params[field] = value;
  }

  axios
    .get(endpoint, { params: params })
    .then((response) => res.json(response.data))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  `server start on port ${port}`;
});
