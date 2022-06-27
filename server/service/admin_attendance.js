const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const findAttendanceByProperty = (key, value) => {
	if (key == "_id") {
		return AdminAttendance.findById(value);
	}
	return AdminAttendance.findOne({ [key]: value });
};
const createAdminAttendance = async ({ timeLimit }) => {
	return new AdminAttendance({ timeLimit });
};
const disableAttendance = async (id) => {
	return AdminAttendance.findByIdAndUpdate(
		id,
		{
			status: "COMPLETED",
		},
		{ new: true }
	);
};
module.exports = {
	createAdminAttendance,
	findAttendanceByProperty,
	disableAttendance,
};
