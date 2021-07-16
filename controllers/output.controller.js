const outputService = require('@app/services/output.service');

const controller = {};

controller.askForOutput = async (req, res, next) => {
  try{
    const { _id: userID } = req.user;
    
    //Check if is already in use
    const { status: alreadyIn, content: output } = await outputService.findOneByUserIn(userID);
    if(alreadyIn) return res.status(200).json({ output: output._id });

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

controller.register = async (req, res, next) => {
  try{
    const { device, channels } = req.body;

    const { status: outputCreated } = await outputService.register(req.body);
    if(!outputCreated) return res.status(409).json({ error: "Output not created!" });

    return res.status(201).json({ 
      message: "Output created!"
     });
  } catch (error) {
    next(error);
  }
}

controller.playOutput = async (req, res, next) => {
  try{

  } catch (error) {
    next(error);
  }
  
}

module.exports = controller;