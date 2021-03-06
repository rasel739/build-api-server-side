const SignupSchema = require("../models/signup.model");
const Token = require("../models/token.model");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const Joi = require("joi");
const { userInfo } = require("os");

const PasswordReset = async (req, res) => {
  // #swagger.tags = ['Reset password']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Send reset password email.',
                schema: { $ref: '#/definitions/ResetPasswordSendEmail' }
        } */
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await SignupSchema.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `http://localhost:3000/resetPassword/${user._id}/${token.token}`;
    await sendEmail(user.email, "Your password has been reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send({
      email: "Please enter your valid email address",
      error: error.message,
    });
  }
};

const passwordResetConfirmation = async (req, res) => {
  // #swagger.tags = ['Reset password']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Set new password.',
                schema: { $ref: '#/definitions/ResetPasswordSet' }
        } */
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await SignupSchema.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send({
      message: "Please check your email and try again valid userId and token",
      error: error.message,
    });
  }
};

module.exports = { PasswordReset, passwordResetConfirmation };
