const router = require("express").Router()
const listController = require("../../controllers/listsdb")

router.route("/lists").get(listController.findAll).post(listController.create)

router.route("/:id").get(listController.findById).put(listController.update).delete(listController.remove)

module.exports = router;