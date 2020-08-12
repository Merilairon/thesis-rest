require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const { errors } = require("celebrate");

const port = process.env.PORT || 4003;
const winston = require(`./config/winston`);
const { connectDatabase } = require("./data/database");
connectDatabase();

const indexRouter = require("./routes/index");

const app = express();

app.use(morgan("tiny", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errors());

app.use((req, res, next) => {
  req.user = req.headers.user ? JSON.parse(req.headers.user) : null;
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Account Service is running on port ${port}.`);
});

module.exports = app;
