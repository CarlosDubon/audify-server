const debug = require("debug")("app:socket");
const maxApi = require("max-api");

const acceptedClients = [];

const connectionFunction = (client) => {
  
  debug("Connection Established");

  client.on("make-request", ()=> {
    // TODO: Make LOL queue to see if it can establish a connection

    client.emit("queue-response", true);
  });

  client.on("position", ({lat, lang}) => {
    // TODO: Varify if client is valid

     maxApi.outlet({lat, lang});
  })
  
};

module.exports = connectionFunction;