const router = require("express").Router()
const listRoutes = require("./listRoutes")
const giftRoutes = require("./giftRoutes")
const userRoutes = require("./userRoutes")

router.use("/list", listRoutes)
router.use("/gift", giftRoutes)
router.use("/user", userRoutes)

module.exports = router;