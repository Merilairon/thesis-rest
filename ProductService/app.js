require("dotenv").config();
let createError = require("http-errors");
let express = require("express");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let db = require("./data/database");
db.connectDatabase();
db.initializeModels();

let indexRouter = require("./routes/index");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.headers.user) req.user = JSON.parse(req.headers.user);
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
