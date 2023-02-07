const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }, { role: regex }],
    $and: [{ status: true }],
  });

  res.json({
    result: users,
  });
};

const searchCategories = async (term = "", res) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const categories = await Category.find({
    name: regex,
    status: true,
  });

  res.json({
    result: categories,
  });
};

const searchProducts = async (term = "", res) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const product = await Product.findById(term).populate("category", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const products = await Product.find({ name: regex, status: true }).populate("category", "name");

  res.json({
    result: products,
  });
};

const search = (req, res) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collections are: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      res.status(500).json({
        msg: "Missing is search",
      });
  }
};

module.exports = {
  search,
};
