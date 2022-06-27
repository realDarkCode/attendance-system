const StudentAttendance = require("../models/StudentAttendance");
const adminAttendanceService = require("../service/admin_attendance");
const error = require("../utils/error");
const findStudentAttendanceByProperty = (key, value) => {
	if (key == "_id") return StudentAttendance.findById(value);
	return StudentAttendance.findOne({ [key]: value });
};

const createStudentAttendance = ({ userId, adminAttendanceId }) => {
	return new StudentAttendance({
		user: userId,
		adminAttendance: adminAttendanceId,
	});
};
const findStudentAttendance = ({ studentId, attendanceId }) => {
	return StudentAttendance.findOne({
		user: studentId,
		adminAttendance: attendanceId,
	});
};
module.exports = {
	findStudentAttendanceByProperty,
	findStudentAttendance,
	createStudentAttendance,
};
