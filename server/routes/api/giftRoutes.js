const router = require("express").Router()
const giftController = require("../../controllers/giftsdb")

router.route("/gifts").get(giftController.findAll).post(giftController.create)

router.route("/:id").get(giftController.findById).put(giftController.update).delete(giftController.remove)

module.exports = router;