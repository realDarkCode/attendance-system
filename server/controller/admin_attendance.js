const adminAttendanceService = require("../service/admin_attendance");
const error = require("../utils/error");
const postEnable = async (req, res, next) => {
	try {
		const { timeLimit } = req.body;
		const currentActiveAttendance =
			await adminAttendanceService.findAttendanceByProperty(
				"status",
				"RUNNING"
			);

		if (currentActiveAttendance) {
			throw error("One or more attendance is already running", 400);
		}
		const attendance = await adminAttendanceService.createAdminAttendance({
			timeLimit,
		});
		await attendance.save();
		return res.status(201).json({ message: "success", attendance });
	} catch (err) {
		next(err);
	}
};

const getDisable = async (_req, res, next) => {
	try {
		const runningAttendance =
			await adminAttendanceService.findAttendanceByProperty(
				"status",
				"RUNNING"
			);
		if (!runningAttendance) {
			throw error("No attendance is running currently", 400);
		}
		const disabledAttendance = await adminAttendanceService.disableAttendance(
			runningAttendance.id
		);
		await disabledAttendance.save();
		return res.status(200).json({ message: "success", disabledAttendance });
	} catch (err) {
		next(err);
	}
};

module.exports = { postEnable, getDisable };
