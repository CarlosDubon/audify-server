const constants = {};

constants.USER_LIMIT_TIME = Number(process.env.USER_LIMIT_TIME) ||  1000 * 60 * 3; 

module.exports = constants;