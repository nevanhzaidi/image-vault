const log = (message) => {
 console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
};

const errorLog = (message) => {
 console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};

export { log, errorLog };
