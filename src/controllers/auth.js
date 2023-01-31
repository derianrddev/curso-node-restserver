const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password are not correct",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: "User / Password are not correct",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password are not correct",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user, 
      token
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  login,
};
