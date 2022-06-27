const router = require("express").Router();
const {
	getAttendance,
	getAttendanceStatus,
	getTimeSheet,
} = require("../controller/student_attendance");
router.get("/status", getAttendanceStatus);
router.get("/timesheet", getTimeSheet);
router.get("/:id", getAttendance);

module.exports = router;
