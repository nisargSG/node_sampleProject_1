const libFs = require('fs');
const libPath = require('path');
const libChalk = require('chalk');
const libTimeZone = require('date-fns-tz')


// Define colors for different statuses
const statusColors = {
    info: libChalk.blue,
    warn: libChalk.yellow,
    error: libChalk.red,
    success: libChalk.green,
};

/**
 * Logs a message with a specific status to the console and a daily log file.
 * 
 * @param {string} status - The status of the log (info, warn, error, success).
 * @param {string} msg - The message to log.
 */



function log(msg, status = 'info') {

    // Generate Log Messa
    const logMessage = `[${libTimeZone.formatInTimeZone(new Date(), process.env.LOGS_TIMEZONE, 'yyyy-MM-dd HH:mm:ssXXX') }] [${status.toUpperCase()}] ${msg}`;

    // Print the colored message to the console
    console.log(statusColors[status](logMessage));

    // Generate the log file name based on the current date in the specified time zone
    const logFilePath = libPath.join(process.cwd(), process.env.DIRECTORY_LOGS, `${libTimeZone.formatInTimeZone(new Date(), process.env.LOGS_TIMEZONE, 'yyyy-MM-dd')}.log`);

    // Generate and Write Log
    libFs.mkdirSync(libPath.join(process.cwd(), process.env.DIRECTORY_LOGS), { recursive: true });
    libFs.appendFileSync(logFilePath, logMessage + '\n', 'utf8');
}

module.exports = log;
