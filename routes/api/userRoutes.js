const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(newUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends").post(addFriend);

router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
