// // utils/logger.js
// const { createLogger, transports, format } = require("winston");
// const path = require("path");

// // Define the log format
// const logFormat = format.printf(({ timestamp, level, message }) => {
//   return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
// });

// // Create logger instance
// const logger = createLogger({
//   level: "info",
//   format: format.combine(format.timestamp(), logFormat),
//   transports: [
//     new transports.File({
//       filename: path.join(__dirname, "../logs/error.log"),
//       level: "error",
//     }),
//     new transports.File({
//       filename: path.join(__dirname, "../logs/combined.log"),
//     }),
//   ],
// });

// module.exports = logger;

const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console(),
  ],
});

module.exports = logger;   // 👈 DEFAULT EXPORT

