const { model, Schema } = require("mongoose");

const adminAttendanceSchema = new Schema({
  timeLimit: Number,
  Status: String,
  createdAt: Date,
});

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = AdminAttendance;
