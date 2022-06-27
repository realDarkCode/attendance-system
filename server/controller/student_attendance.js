const studentAttendanceService = require("../service/student_attendance");
const adminAttendanceService = require("../service/admin_attendance");
const error = require("../utils/error");
const getAttendanceStatus = async (req, res, next) => {
	try {
		const activeAttendance = await adminAttendanceService.attendanceStatus();
		if (!activeAttendance) {
			return res.status(200).json({ message: "No Attendance running" });
		}

		return res.status(200).json(activeAttendance);
	} catch (err) {
		next(err);
	}
};
const getAttendance = async (req, res, next) => {
	const { id } = req.params;
	try {
		let attendance = await studentAttendanceService.findStudentAttendance({
			studentId: req.user._id,
			attendanceId: id,
		});
		console.log({ attendance });
		if (attendance) {
			throw error("Already already recorded", 400);
		}
		const adminAttendance = await adminAttendanceService.attendanceStatusById(
			id
		);
		if (adminAttendance.status === "COMPLETED") {
			throw error("Attendance already completed", 400);
		}
		attendance = await studentAttendanceService.createStudentAttendance({
			userId: req.user._id,
			adminAttendanceId: adminAttendance._id,
		});
		await attendance.save();
		return res.status(201).json(attendance);
	} catch (err) {
		next(err);
	}
};
const getTimeSheet = async (_req, res, next) => {
	try {
		res.status(200).send();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getAttendanceStatus,
	getAttendance,
	getTimeSheet,
};
