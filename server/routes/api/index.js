const router = require("express").Router()
const groupRoutes = require("./groupRoutes")
const giftRoutes = require("./giftRoutes")
const userRoutes = require("./userRoutes")

router.use("/group", groupRoutes)
router.use("/gift", giftRoutes)
router.use("/user", userRoutes)

module.exports = router;