
// better to set require object as const, so can avoid accidental override.
const logger = require('./logger') 
logger.log('message')
console.log(logger);
