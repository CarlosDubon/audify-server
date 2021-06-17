const constants = {};

constants.USER = process.env.USER_ROLE || "USER";
constants.ADMIN = process.env.ADMIN_ROLE || "ADMIN";
constants.ENUM = [constants.USER, constants.ADMIN];

module.exports = constants;