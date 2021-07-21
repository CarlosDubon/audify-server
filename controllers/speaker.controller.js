const speakerService = require("@app/services/speaker.service");

const controller = {};

controller.register = async (req, res, next) => {
  try{
    const {status: speakerCreated} = await speakerService.register(req.body);
    if(!speakerCreated) return res.status(409).json({ error: "Output not created!" });

    return res.status(201).json({ error: "Output created!" });
  } catch (error) {
    next(error);
  }
}

controller.findAll = async (req, res, next) => {
  try{
    const { content: speakers } = await speakerService.findAll();
    return res.status(200).json(speakers);
  } catch (error) {
    next(error);
  }
}

controller.findOneById = async (req, res, next) => {
  try{
    const { id } = req.params;

    const { status: speakerExists, content: speaker } = await speakerService.findOneById(id);
    if(!speakerExists) return res.status(404).json({ error: "Speaker not found!" });

    return res.status(200).json(speaker);
  } catch (error) {
    next(error);
  }
}

controller.update = async (req, res, next) => {
  try{
    const { id } = req.params;

    const { status: speakerExists, content: speaker } = await speakerService.findOneById(id);
    if(!speakerExists) return res.status(404).json({error: "Speaker not found!"});

    const { status: speakerUpdated } = await speakerService.updateSpeaker(speaker, req.body);
    if(!speakerUpdated) return res.status(409).json({ error: "Speaker not updated" });

    return res.status(200).json({ message: "Speaker updated" });
  } catch (error) {
    next(error);
  }
}

controller.udpatePhoto = async (req, res, next) => {
  try{
    const { id } = req.params;
    const { photo } = req.body;

    const { status: speakerExists, content: speaker } = await speakerService.findOneById(id);
    if(!speakerExists) return res.status(404).json({error: "Speaker not found!"});

    const { status: speakerUpdated } = await speakerService.updatePhoto(speaker, photo);
    if(!speakerUpdated) return res.status(409).json({ error: "Speaker not updated" });

    return res.status(200).json({ error: "Speaker updated" });
  } catch (error) {
    next(error);
  }
}

controller.delete = async (req, res, next) => {
  try{
    const { id } = req.params;

    const { status: speakerExists, content: speaker } = await speakerService.findOneById(id);
    if(!speakerExists) return res.status(404).json({error: "Speaker not found!"});

    const { status: speakerDeleted } = await speakerService.deleteSpeaker(speaker);
    if(!speakerDeleted) return res.status(409).json({ error: "Speaker not deleated" });

    return res.status(200).json({ message: "Speaker Deleted " });
  } catch (error) {
    next(error);
  }
}

controller.deleteMany = async (req, res, next) => {
  try{
    const { speakers } = req.body;

    const deletePromises = speakers.map(async (id) => {
      const { status: speakerExists, content: speaker } = await speakerService.findOneById(id);
      if(!speakerExists) return false;

      const { status: speakerDeleted } =  await speakerService.deleteSpeaker(speaker);
      if(!speakerDeleted) return false;

      return true;
    });

    const deleteStatus = await Promise.all(deletePromises);

    const response = deleteStatus.map((status, i) => ({
      speaker: speakers[i],
      deleted: status,
    }));

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = controller;