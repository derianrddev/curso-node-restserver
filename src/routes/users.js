const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.patch("/", patchUser);

module.exports = router;
