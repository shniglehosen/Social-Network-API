const router = require("express").Router();

const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers);
router.route("/").post(createUser);

router.route("/:userId").get(getSingleUser);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

router.route("/:userId/friends/:friendId").post(createFriend);
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
