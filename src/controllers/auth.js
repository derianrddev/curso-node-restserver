const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/googleVerify");
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
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

const googleSignIn = async (req, res) => {
  const { idToken } = req.body;

  try {
    const { name, img, email } = await googleVerify(idToken);

    let user = await User.findOne({ email });

    if (!user) {
      // Encrypt the password
      const salt = bcryptjs.genSaltSync(10);
      const password = bcryptjs.hashSync(":P", salt);

      user = new User({ name, email, password, img, google: true });
      await user.save();
    } else {
      if (user.google === false) {
        return res.status(400).json({
          message: "You must use your normal authentication",
        });
      }
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "Talk to administrator, user blocked",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "The token could not be verified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
