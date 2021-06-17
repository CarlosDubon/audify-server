const rolesConsts = require('./roles');
const regexpsConsts = require('./regexps');

const constants = {};

constants.ROLES = { ...rolesConsts };
constants.REGEXP = { ...regexpsConsts };

module.exports = constants;