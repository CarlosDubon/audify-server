const Speaker = require("@app/models/Speaker");
const { sanitizeObject } = require("@app/utils/object.tools");
const { SPEAKERS } = require("@app/constants");

const ServiceResponse = require("@app/classes/ServiceResponse");

const service = {};

service.register = async ({ name, sound, latitude, longitude, radius, type }) => {
  try{
    const speakerType = SPEAKERS.FUNCTIONS.find(func => func.id === type);
    console.log(type);
    if(!speakerType) return new ServiceResponse(false)

    const speaker =  new Speaker({
      name, sound, latitude, longitude, radius, type: speakerType
    });

    const speakerSaved = await speaker.save();

    if(!speakerSaved) return new ServiceResponse(false);
    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.findAll = async () => {
  try{
    const speakers = await Speaker.find({});
    return new ServiceResponse(true, speakers);
  } catch (error) {
    throw error;
  }
}

service.findOneById = async (id) => {
  try{
    const speaker = await Speaker.findById(id);

    if(!speaker) return new ServiceResponse(false);
    return new ServiceResponse(true, speaker);
  } catch (error) {
    throw error;
  }
}

service.updateSpeaker = async (speaker, { name, sound, latitude, longitude, radius, type }) => {
  try{
      const speakerType = SPEAKERS.FUNCTIONS.find(func => func.id === type);

      const updateFields = sanitizeObject({ name, sound, latitude, longitude, radius, type: speakerType ? speakerType : undefined });
      
      Object.keys(updateFields).forEach(key => {
        speaker[key] = updateFields[key];
      });

      const speakerSaved = await speaker.save();
      if(!speakerSaved) return new ServiceResponse(false);

      return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.updatePhoto = async (speaker, photo) => {
  try{
    speaker.photo = photo;

    const speakerSaved = await speaker.save();
    if(!speakerSaved) return new ServiceResponse(false);

    return new ServiceResponse(true);
  } catch (error) {
    throw error;
  }
}

service.deleteSpeaker = async (speaker) => {
  try{
    const speakerDeleted = await Speaker.deleteOne({ _id: speaker._id });

    if(!speakerDeleted) return new ServiceResponse(false);
    return new ServiceResponse(true); 
  } catch (error) {
    throw error;
  }
}

module.exports = service;