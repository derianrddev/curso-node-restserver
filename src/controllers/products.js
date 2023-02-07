const { Category, Product } = require("../models");

const getProducts = async (req, res) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.count(query),
    Product.find(query)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category", "name"),
  ]);

  res.json({
    total,
    products,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById( id ).populate("user", "name").populate("category", "name");

  if (!product.status) {
    return res.status(400).json({
      msg: "The product does not exist",
    });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  const { status, user, ...info} = req.body;

  info.category = info.category.toUpperCase();
  const { _id } = await Category.findOne({ name: info.category });

  const product = new Product({
    ...info,
    name: info.name.toUpperCase(),
    user: req.user._id,
    category: _id
  });

  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { _id, status, user, ...info } = req.body;

  if (info.name) {
    info.name = info.name.toUpperCase();
  }

  if (info.category) {
    info.category = info.category.toUpperCase();
    const { _id:cid } = await Category.findOne({ name: info.category });
    info.category = cid;
  }

  const product = await Product.findByIdAndUpdate(id, info, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
