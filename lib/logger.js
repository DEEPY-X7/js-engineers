import winston from 'winston';

// Create a custom logger using Winston
const logger = winston.createLogger({
  level: 'info', // log everything at or above the "info" level
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors to the console logs
        winston.format.simple()    // Simple format without JSON
      ),
    }),
    new winston.transports.File({
      filename: 'logs/app.log', // Log to this file
      format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp
        winston.format.json()       // Log in JSON format
      ),
    }),
  ],
});

// Function to log request details
const logRequest = (req) => {
  logger.info(`Request received: ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
  });
};

// Function to log errors
const logError = (error) => {
  logger.error('Error occurred', {
    message: error.message,
    stack: error.stack,
  });
};

// Function to log general events
const logEvent = (message, data = null) => {
  logger.info(message, { data });
};

// Export logger and helper functions
export { logger, logRequest, logError, logEvent };
export default logger;