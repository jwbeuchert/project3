const router = require("express").Router()
const groupController = require("../../controller/groupsdb")

router.route("/").get(groupController.findAll).post(groupController.create)

router.route("/:id").get(groupController.findById).put(groupController.update).delete(groupController.remove)

module.exports = router;