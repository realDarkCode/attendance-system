const router = require("express").Router();

const { postEnable, getDisable } = require("../controller/admin_attendance");

router.post("/enable", postEnable);
router.get("/disable", getDisable);

module.exports = router;
