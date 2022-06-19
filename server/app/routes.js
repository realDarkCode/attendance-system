const router = require("express").Router();
const authRoute = require("../routes/auth.route");
router.get("/health", (_req, res) => {
  res.status(200).json({ message: "success" });
});
router.use("/auth", authRoute);

module.exports = router;
