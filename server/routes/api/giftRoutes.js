const router = require("express").Router();
const giftController = require("../../controllers/giftsdb");

router.route("/:listid").post(giftController.create);
router
  .route("/:giftid")
  .get(giftController.findOne)
  .put(giftController.update)
  .delete(giftController.remove);
router
  .route("/:giftid/:listid")
  .put(giftController.addGiftToList)
  .delete(giftController.removeGiftFromList);

module.exports = router;
