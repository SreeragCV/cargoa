const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, hashPassword, role });
    await user.save();
    res.send(user);
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
