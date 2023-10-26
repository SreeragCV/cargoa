const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).send("ACCESS DENIED/ UNAUTHORIZED REQUEST");
  try {
    token = token.split(" ")[1];
    if (token === "null" || !token)
      return res.status(401).send("UNAUTHORIZED REQUEST");
    let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifiedUser) return res.status(401).send("UNAUTHORIZED REQUEST");
    req.user = verifiedUser;
    console.log(verifiedUser);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
