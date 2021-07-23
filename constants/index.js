const rolesConsts = require('./roles');
const regexpsConsts = require('./regexps');
const generalConsts = require('./general');
const speakersConsts = require('./speakers');

const constants = {};

constants.ROLES = { ...rolesConsts };
constants.REGEXP = { ...regexpsConsts };
constants.GENERAL = { ...generalConsts };
constants.SPEAKERS = { ...speakersConsts };

module.exports = constants;