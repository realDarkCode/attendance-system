const router = require("express").Router();

const {
	postEnable,
	getDisable,
	getStatus,
} = require("../controller/admin_attendance");

router.post("/enable", postEnable);
router.get("/disable", getDisable);
router.get("/status", getStatus);

module.exports = router;
