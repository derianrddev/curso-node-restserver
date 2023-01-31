const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Read the user that corresponds to the uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token does not valid",
      });
    }

    // Check if the uid has status true
    if (!user.status) {
      return res.status(401).json({
        msg: "Token does not valid",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token does not valid",
    });
  }
};

module.exports = {
  validJWT,
};
