// Create logs directory if it doesn't exist
const path = require('path');
const winston = require('winston');
const logDirectory = path.join(__dirname, 'logs');
require('fs').existsSync(logDirectory) || require('fs').mkdirSync(logDirectory);

// Log path
const logPath = path.join(logDirectory, 'app.log');

// Define the logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logPath }),
  ],
});


module.exports = {logger};