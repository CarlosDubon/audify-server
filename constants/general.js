const constants = {};

constants.USER_LIMIT_TIME = Number(process.env.USER_LIMIT_TIME) ||  1000 * 60 * 3; 
constants.PORT = process.env.PORT || "3000";
constants.BASE_API_URL = process.env.BASE_URL || `http://localhost:${constants.PORT}`; 

module.exports = constants;