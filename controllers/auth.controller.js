const userService = require('@app/services/user.service');
const { createToken, verifyToken } = require('@app/utils/jwt.tools');
const { sendMail } = require("@app/utils/mailer.tools");
const { getRegisterMailText, getPasswordRecoveryMailText } = require("@app/utils/formatter.tools");

const controller = {};

controller.register = async (req, res, next) => {
  try{
    const { username, email } = req.body;

    const { status: userExists } = await userService.findOneByUsernameOrEmail({username, email});
    if(userExists) return res.status(409).json({error: "User already exists!"});

    const {status: userRegistered} = await userService.register(req.body);

    if(!userRegistered) return res.status(409).json({error: "User not creared!"});

    sendMail(
      email, "[Audify] User created successfully",
      getRegisterMailText(username)
    )

    return res.status(201).json({
      message: "User registered"
    });    
  } catch (error) {
    next(error);
  }
}

controller.login = async (req, res, next) => {
  try{
    const { username, password } = req.body;

    const { status: userExists, content: user } = await userService.findOneByUsernameOrEmail({username: username, email: username});
    if(!userExists) return res.status(404).json({ error: "User not found!" });

    const isPasswordCorrect = user.comparePassword(password);
    if(!isPasswordCorrect) return res.status(401).json({error: "Password incorrect!"});

    const token = createToken(user._id);
    
    const { status: tokenSaved } = await userService.insertValidToken(user._id, token);
    if(!tokenSaved) return res.status(409).json({ error: "Cannot login!" });

    return res.status(200).json({ token: token, role: user.role });
  } catch (error) {
    next(error);
  }
}

controller.forgotPassword = async (req, res, next) => {
  try{
    const { username } = req.body;

    const { status: userExists, content: user } = await userService.findOneByUsernameOrEmail({username: username, email: username});
    if(!userExists) return res.status(200).json({ message: "Request saved!" });
    
    const passwordToken = createToken(user._id, true);

    const { status: tokenSaved } = await userService.insertPasswordResetToken(user._id, passwordToken);
    if(!tokenSaved) return res.status(200).json({ message: "Request saved!" });

    sendMail(
      user.email,
      "[Audify] Password recovery",
      getPasswordRecoveryMailText(passwordToken)
    )

    return res.status(200).json({ message: "Request saved!" });
  } catch (error) {
    next(error);
  }
}

controller.passwordRecovery = async (req, res, next) => {
  try{
    const { token, password } = req.body;

    const isValidToken = verifyToken(token);
    if(!isValidToken) return res.status(400).json({ error: "Invalid token" });

    const { _id: userID } = isValidToken;

    const { status: userExists, content: user } = await userService.findOneById(userID);
    if(!userExists) return res.status(404).json({ error: "User not found!" });

    const { status: isVerifiedPasswordToken } = await userService.verifyPasswordResetToken(user._id, token);
    if(!isVerifiedPasswordToken) return res.status(400).json({ error: "Invalid token" });

    const { status: passwordUpdated } = await userService.updatePassword(user, password);
    if(!passwordUpdated) return res.status(409).json({ error: "Password cannot be updated" }); 

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;