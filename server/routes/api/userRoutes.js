const router = require("express").Router();
const userController = require("../../controllers/usersdb");

router
  .route("/")
  .get(userController.findAll)
  .post(userController.createOrFindOne);
router.route("/email").get(userController.findOneByEmail);
router
  .route("/:currentUserId/:friendId")
  .put(userController.addFriend)
  .delete(userController.removeFriend);
router.route("/:id").get(userController.findById);
module.exports = router;
