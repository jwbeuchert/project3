const router = require("express").Router()
const listController = require("../../controllers/listsdb")

router.route("/").get(listController.findAll)

router.route("/:id").get(listController.findById).put(listController.update).delete(listController.remove)
router.route("/:userid").post(listController.create)


module.exports = router;