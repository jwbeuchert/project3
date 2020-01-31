const router = require("express").Router();
const listRoutes = require("./listRoutes");
const giftRoutes = require("./giftRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");

router.use("/list", listRoutes);
router.use("/gift", giftRoutes);
router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
