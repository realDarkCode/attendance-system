const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    minlength: 3,
    maxlength: 20, 
  },
  email: {
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(v)
      },
      message:  props => `Invalid email: ${props.value}`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password is too short"],
    maxlength: [30, "Password is too long"],
  },
  roles: {
    type: [String],
    required: true, 
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING"
  },
});
const User = model("User", userSchema);
module.exports = User;
