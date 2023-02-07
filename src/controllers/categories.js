const { Category } = require("../models");

const getCategories = async (req, res) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.count(query),
    Category.find(query)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById( id ).populate("user", "name");

  if (!category.status) {
    return res.status(400).json({
      msg: "The category does not exist",
    });
  }

  res.json(category);
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  const category = new Category({
    name,
    user: req.user._id,
  });

  await category.save();

  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { _id, status, user, ...info } = req.body;

  info.name = info.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(id, info, { new: true });

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(category);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
