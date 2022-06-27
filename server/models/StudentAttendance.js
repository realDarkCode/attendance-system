const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		adminAttendance: {
			type: Schema.Types.ObjectId,
			ref: "AdminAttendance",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const studentAttendance = model("studentAttendance", studentAttendanceSchema);
module.exports = studentAttendance;
