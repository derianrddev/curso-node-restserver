const { Router } = require("express");
const { check, query } = require("express-validator");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const {
  existCategoryById,
  isUniqueCategory,
} = require("../helpers/dbValidators");
const { validFields, validJWT, isAdminRole } = require("../middlewares");

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
  getCategories
);

router.get(
  "/:id",
  [check("id").custom(existCategoryById), validFields],
  getCategoryById
);

router.post(
  "/",
  [
    validJWT,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(isUniqueCategory),
    validFields,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validJWT,
    check("name", "Name is required").not().isEmpty(),
    check("id").custom(existCategoryById),
    check("name").custom(isUniqueCategory),
    validFields,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [validJWT, isAdminRole, check("id").custom(existCategoryById), validFields],
  deleteCategory
);

module.exports = router;
