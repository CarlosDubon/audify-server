const userService = require("@app/services/user.service");
const { ROLES } = require("@app/constants");

const controller = {};

controller.whoami = async (req, res, next) => {
  try{
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
}

controller.changeOwnPassword = async (req, res, next) => {
  try{
    const { password } = req.body;
    
    const { status: passwordUpdated } = await userService.updatePassword(req.user, password, req.token);

    if(!passwordUpdated) return res.status(409).json({ error: "Password not updated" });

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
}

controller.findAll = async (req, res, next) => {
  try{
    const { content: users } = await userService.findAll();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

controller.findById = async (req, res, next) => {
  try{
    const { id } = req.params;

    const { status: userExists, content: user } =  await userService.findOneById(id);
    if(!userExists) return res.status(404).json({ error: "User not found" });
    
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

controller.changeUserPassword = async (req, res, next) => {
  try{
    const { password } = req.body;
    const { id } = req.params;

    const { status: userExists, content: user } =  await userService.findOneById(id);
    if(!userExists) return res.status(404).json({ error: "User not found" });
    
    const { status: passwordUpdated } = await userService.updatePassword(user, password);

    if(!passwordUpdated) return res.status(409).json({ error: "Password not updated" });

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
}

controller.promoteUserToRole = (role) => async (req, res, next) => {
  try{
    const { id } = req.params;

    const { status: userExists, content: user } =  await userService.findOneById(id);
    if(!userExists) return res.status(404).json({ error: "User not found" });

    const { status: roleUpdated } = await userService.updateRole(user, role);
    if(!roleUpdated) return res.status(409).json({ error: "Role not updated" });

    return res.status(200).json({ message: "Role updated" });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;