const validFields = require("../middlewares/validFields");
const validJWT = require("../middlewares/validJWT");
const validRoles = require("../middlewares/validRoles");

module.exports = {
  ...validFields,
  ...validJWT,
  ...validRoles
}