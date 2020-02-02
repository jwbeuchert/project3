const router = require("express").Router()
const listController = require("../../controllers/listsdb")

router.route("/:userid").post(listController.create)
router.route("/:listid/:userid").delete(listController.remove)
router.route("/").get(listController.findAll)


module.exports = router;