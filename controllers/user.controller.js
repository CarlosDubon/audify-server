const userService = require("@app/services/user.service");

const controller = {};

controller.whoami = async (req, res, next) => {
  try{
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
}

controller.changePassword = async (req, res, next) => {
  try{
    const { password } = req.body;
    
    const { status: passwordUpdated } = await userService.updatePassword(req.user, password, req.token);

    if(!passwordUpdated) return res.status(409).json({ error: "Password not updated" });

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;