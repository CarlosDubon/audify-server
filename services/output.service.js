const Output = require('@app/models/Output');
const { GENERAL } = require('@app/constants');
const ServiceResponse = require('@app/classes/ServiceResponse');

const service = {};

service.register = async ({device, channels}) => {
  try{
    const output = new Output({ device, channels });
    const outputSaved = await output.save();

    if(!outputSaved) return new ServiceResponse(false);
    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.timeLimitPurge = async () => {
  try{
    const outputs = await Output.find({});

    //Time limit verification
    const verifyPromises = outputs.map(async (output) =>{ 
      const now = new Date();
      const { lastTime } = output;
      const diff = Math.abs(now - lastTime);

      if(lastTime && diff < GENERAL.USER_LIMIT_TIME) {
        output.userIn = null;
        output.lastTime = null;

        const outSaved = await output.save();
        if(!outSaved) return false;
      }

      return true;
    });

    const results = await Promise.all(verifyPromises);

    if(results.some(res => !res)) return new ServiceResponse(false);

    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.findOneFree = async () => {
  try{
    //Time limit purge
    const { status: purged } = await service.timeLimitPurge();
    if(!purged) return new ServiceResponse(false);

    const outputs = await Output.find({});

    const freeSpace = outputs.find(output => output.userIn === null);

    if(!freeSpace) return new ServiceResponse(false);
    return new ServiceResponse(true, freeSpace);
  } catch (error) {
    throw error;
  }
}

service.findOneByUserIn = async (userID) => {
  try{
    const output = await Output.findOne({ userIn: userID });

    if(!output) return new ServiceResponse(false);
    return new ServiceResponse(true, output);
  } catch (error) {
    throw error;
  }
}

service.addUser = async (output, userID) => {
  try{
    output.userIn = userID;
    output.lastTime = new Date();

    const outputSaved = await output.save();

    if(!outputSaved) return new ServiceResponse(false);
    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.removeUser = async (output) => {
  try{
    output.userIn = null;
    output.lastTime = null;

    const outputSaved = await output.save();

    if(!outputSaved) return new ServiceResponse(false);
    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.syncLastTime = async (output) => {
  try{
    output.lastTime = new Date();

    const outputSaved = await output.save();

    if(!outputSaved) return new ServiceResponse(false);
    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

module.exports = service;