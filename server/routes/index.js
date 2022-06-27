const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./users");
const adminAttendanceRoutes = require("./admin_attendance");
const studentAttendanceRoutes = require("./student_attendance");
const authenticate = require("../middleware/authentication");
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoutes);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRoutes);

module.exports = router;
