const controller = {};

controller.whoami = async (req, res, next) => {
  try{
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
}

module.exports = controller;