let { createLogger, transports, format } = require("winston");

let options = {
  file: {
    level: "info",
    filename: `../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    handleExceptions: true,
  },
};

let logger = new createLogger({
  transports: [
    //new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
