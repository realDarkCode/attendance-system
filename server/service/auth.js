const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const { findUserByProperty, createNewUser } = require("./user");
const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User already exist", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash, roles, accountStatus });
};
const loginService = async ({ email, password }) => {
  // check if there any user with that email
  const user = await findUserByProperty("email", email);
  if (!user) throw error("Invalid credential", 400);

  // match password with hashed form
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("Invalid credential", 400);

  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, process.env.JWT_SIGNATURE, {
    expiresIn: "7d",
  });
};

module.exports = { loginService, registerService };
