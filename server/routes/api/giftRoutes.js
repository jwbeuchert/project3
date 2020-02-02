const router = require("express").Router()
const giftController = require("../../controllers/giftsdb")

router.route("/:listid").post(giftController.create)

router.route("/:giftid").delete(giftController.remove)


router.route("/:giftid/:listid").put(giftController.addGiftToList)
router.route("/:giftid").put(giftController.update)

router.route("/").get(giftController.findAll)

module.exports = router;