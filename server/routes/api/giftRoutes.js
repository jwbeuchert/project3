const router = require("express").Router()
const giftController = require("../../controllers/giftsdb")

router.route("/:giftid").put(giftController.update)
router.route("/:listid").post(giftController.create)
router.route("/:giftid/:listid").delete(giftController.remove)

module.exports = router;