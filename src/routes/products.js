const { Router } = require("express");
const { check, query } = require("express-validator");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const { existProductById, isUniqueProduct, existCategory } = require("../helpers/dbValidators");
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
  getProducts
);

router.get(
  "/:id",
  [check("id").custom(existProductById), validFields],
  getProductById
);

router.post(
  "/",
  [
    validJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("name").custom(isUniqueProduct),
    check('category').custom(existCategory),
    validFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validJWT,
    check("id").custom(existProductById),
    check("name").custom(isUniqueProduct),
    check('category').optional().custom(existCategory),
    validFields,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [validJWT, isAdminRole, check("id").custom(existProductById), validFields],
  deleteProduct
);

module.exports = router;
