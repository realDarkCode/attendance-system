const AdminAttendance = require("../models/AdminAttendance");
const { addMinutes, isAfter } = require("date-fns");

const error = require("../utils/error");

const findAttendanceByProperty = (key, value) => {
	if (key == "_id") {
		return AdminAttendance.findById(value);
	}
	return AdminAttendance.findOne({ [key]: value });
};
const createAdminAttendance = ({ timeLimit }) => {
	return new AdminAttendance({ timeLimit });
};
const disableAttendance = (id) => {
	return AdminAttendance.findByIdAndUpdate(
		id,
		{
			status: "COMPLETED",
		},
		{ new: true }
	);
};
const attendanceStatus = async () => {
	const attendance = await findAttendanceByProperty("status", "RUNNING");
	if (attendance) {
		const started = addMinutes(
			new Date(attendance.createdAt),
			attendance.timeLimit
		);
		if (isAfter(new Date(), started)) {
			attendance.status = "COMPLETED";
			return attendance.save();
		}
	}
	return attendance;
};
const attendanceStatusById = async (adminAttendanceId) => {
	const attendance = await findAttendanceByProperty("_id", adminAttendanceId);
	if (!attendance) throw error("Invalid Attendance id", 400);
	if (attendance) {
		const started = addMinutes(
			new Date(attendance.createdAt),
			attendance.timeLimit
		);
		if (isAfter(new Date(), started)) {
			attendance.status = "COMPLETED";
			return attendance.save();
		}
	}
	return attendance;
};
module.exports = {
	createAdminAttendance,
	findAttendanceByProperty,
	disableAttendance,
	attendanceStatus,
	attendanceStatusById,
};
