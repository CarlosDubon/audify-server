const outputService = require('@app/services/output.service');

const controller = {};

controller.askForOutput = async (req, res, next) => {
  try{
    const { _id: userID } = req.user;
    
    //Check if is already in use
    const { status: alreadyIn } = await outputService.findOneByUserIn(userID);
    if(alreadyIn) return res.status(403).json({ error: "You already have an audio output" });

    const { status: anyFree, content: outputFree } = await outputService.findOneFree();
    if(!anyFree) return res.status(404).json({ error: "Free output not found! Try it later" });

    const { status: userAdded } = await outputService.addUser(outputFree, userID);
    if(!userAdded) return res.status(409).json({ error: "User not registered!" });

    return res.status(200).json({
      output: outputFree._id,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;