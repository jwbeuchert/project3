const router = require("express").Router();
const giftController = require("../../controllers/giftsdb");

router.route("/:listid").post(giftController.create);
router
  .route("/:giftid")
  .put(giftController.update)
  .delete(giftController.remove);
router.route("/:giftid/:listid").put(giftController.addGiftToList);

module.exports = router;
