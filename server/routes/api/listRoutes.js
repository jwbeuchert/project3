const router = require("express").Router();
const listController = require("../../controllers/listsdb");

router.route("/:listid").get(listController.findOne)
router.route("/:userid").post(listController.create);
router.route("/:listid/:userid").delete(listController.remove);
router.route("/add-gifter/:listid/:userid").put(listController.addGifter);
router.route("/remove-gifter/:listid/:userid").put(listController.removeGifter);
router.route("/").get(listController.findAll);

module.exports = router;
