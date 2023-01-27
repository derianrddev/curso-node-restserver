const getUsers = (req, res) => {
  const { q, name, apikey, page = 1, limit } = req.query;
  res.json({
    msg: "Getting users",
    q,
    name, 
    apikey,
    page,
    limit
  });
};

const createUser = (req, res) => {
  const { name, age } = req.body;
  res.status(201).json({
    msg: "Creating a user",
    name,
    age,
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "Updating a user",
    id,
  });
};

const deleteUser = (req, res) => {
  res.json({
    msg: "Deleting a user",
  });
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
