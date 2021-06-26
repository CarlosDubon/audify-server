const debug = require("debug")("app:socket");
//const maxApi = require("max-api");

const acceptedClients = [];

const connectionFunction = (client) => {
  
  debug("Connection Established");

  client.on("position", ({lat, long}) => {
    // TODO: Varify if client is valid

    debug(`Lat: ${lat} - Long: ${long}`);

     //maxApi.outlet({lat, lang});
  })
  
};

module.exports = connectionFunction;