const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const dotenv = require('dotenv');
dotenv.config();

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const userExist = await User.find({ email: email });
    if (userExist.length === 0) {
      const user = new User({ username, email, hashPassword, role });
      await user.save();
      res.send(user);
    } else {
      res.status(409).json("EMAIL ALREADY REGISTERED");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username: username });
    const userPassword = user[0].hashPassword;
    const validPassword = await bcrypt.compare(password, userPassword);
    if (validPassword) {
      const payload = {role: user[0].role, email: user[0].email}
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '3600s'})
      return res.status(200).header("auth-token", token).send({ "token": token });
    } else {
      res.status(401).json("WRONG PASSWORD!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
