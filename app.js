const express = require("express");
const expressLogger = require("express-bunyan-logger");
const cors = require("cors");
const router = require("./routes");
const path = require("path");


process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(express.static("assets"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use(
  expressLogger({
    excludes: [
      "headers",
      "req",
      "user-agent",
      "short-body",
      "http-version",
      "req-headers",
      "res-headers",
      "body",
      "res",
    ], // remove extra details from log
  })
);


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Test Route
app.get("/api/test", (req, res) => {
  res.status(200).send(`Puppydog API 1.0`);
});

// routes
app.use("/api", router);

// catch 404
app.use((req, res) => {
  return res.status(404).send({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  req.log.error(err);
  return res.status(err.status || 500).send({
    success: false,
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
