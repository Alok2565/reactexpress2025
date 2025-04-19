const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/error.log');
//console.log(logFile);
const logToFile = (type, message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
};

module.exports = { logToFile };
