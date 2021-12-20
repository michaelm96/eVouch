// require('dotenv').config()
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;

  if (!access_token) {
    return res.status(404).json({
      message: "access token not found",
    });
  }
  try {
    let decoded = jwt.verify(access_token, secretKey);
    req.userData = decoded;
    console.log(decoded, "DCD");
    next();
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

module.exports = authentication;
