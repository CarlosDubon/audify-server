const rolesConsts = require('./roles');
const regexpsConsts = require('./regexps');
const generalConsts = require('./general');

const constants = {};

constants.ROLES = { ...rolesConsts };
constants.REGEXP = { ...regexpsConsts };
constants.GENERAL = { ...generalConsts };

module.exports = constants;