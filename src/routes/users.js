const { Router } = require("express");
const { check, query } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
} = require("../controllers/users");
const {
  isValidRole,
  isUniqueEmail,
  existUserById,
} = require("../helpers/dbValidators");
const { validFields } = require("../middlewares/validFields");

const router = Router();

router.get(
  "/",
  [
    query("limit", "The value of 'limit' must be numeric")
      .isNumeric()
      .optional(),
    query("since", "The value of 'since' must be numeric")
      .isNumeric()
      .optional(),
    validFields,
  ],
  getUsers
);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "The password must have more than 6 characters").isLength(
      { min: 6 }
    ),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(isUniqueEmail),
    // check("role", "Not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isValidRole),
    validFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    // check("id", "Not a valid ID").isMongoId(),
    check("id").custom(existUserById),
    check("role").optional().custom(isValidRole),
    validFields,
  ],
  updateUser
);

router.delete("/:id", [
  check("id").custom(existUserById),
  validFields,
], deleteUser);

router.patch("/", patchUser);

module.exports = router;
