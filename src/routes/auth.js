const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validFields } = require("../middlewares/validFields");

const router = Router();

router.post(
  "/login",
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validFields,
  ],
  login
);

router.post(
  "/google",
  [
    check('idToken', 'The id token is required').not().isEmpty(),
    validFields,
  ],
  googleSignIn
);

module.exports = router;
