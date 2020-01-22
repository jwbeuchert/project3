const router = require("express").Router()
const chatsController = require("../../controllers/chatsdb")

router.route("/").get(chatsController.findAll).post(chatsController.create)

router.route("/:id").get(chatsController.findById).put(chatsController.update).delete(chatsController.remove)

module.exports = router;