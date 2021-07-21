const debug = require("debug")("app:socket");

const userService = require("@app/services/user.service");
const outputService = require("@app/services/output.service");
const { verifyToken } = require("@app/utils/jwt.tools");
//const maxApi = require("max-api");

const connectionFunction = (client) => {

  debug("Connection Established");

  client.on("position", ({lat, long, rot=0, option=1,pLat,pLong,sOption}) => {

    debug(`Lat: ${lat} - Long: ${long}`);
    debug(`Rot: ${rot} - Option: ${option} - SourceOption ${sOption}`);
    debug(`Place latitude: ${pLat} - Place longitude: ${pLong}`);

     //maxApi.outlet({lat, long, rot, option});
  });

  client.on('disconnect',  () => {
    debug("User diconnected")
  })

};

const authVerification = async (socket, next) => {
  debug("Checking user")
  const { token } = socket.handshake.auth;
  debug(socket.handshake.auth);
  if(token) {
    const payload = verifyToken(token);
    if(!payload) return next(new Error("Authentication error"));

    const {_id: userID} = payload;
    const { status: userExists, content: user } = await userService.findOneById(userID);
    if(!userExists) return next(new Error("Authentication error"));

    const { status: validToken } = await userService.verifyValidToken(userID, token);
    if(!validToken) return next(new Error("Authentication error"));

    debug("User checked!")
    socket.user = user;
    next();
  }else {
    next(new Error("Authentication error"));
  }
}

module.exports = {
  connectionFunction,
  authVerification
};
