const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/User");

/**-----------------------------------------------
 * @desc    Send Reset Password Link
 * @route   /api/password/reset-password-link
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User with given email does not exist!" });
  }

  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}`;
  res.status(200).json({
    message: "Password reset link created and can be sent to user",
    resetLink: link
  });
});

/**-----------------------------------------------
 * @desc    Reset Password
 * @route   /api/password/reset-password/:userId/:token
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
  const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password reset successfully, please log in" });
});