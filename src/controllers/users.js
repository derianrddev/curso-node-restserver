const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const getUsers = async (req, res) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.count(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt the password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  // Save to DB
  await user.save();

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...info } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    info.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, info, { new: true });

  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Physically delete from the DB
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(user);
};

const patchUser = (req, res) => {
  res.json({
    msg: "Patching a user",
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
};
