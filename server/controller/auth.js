const express = require("express");
const { registerService, loginService } = require("../service/auth");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const registerController = async (req, res, next) => {
  // destructing required information for registration
  const { name, email, password } = req.body;
  // basic level validation
  if (!name || !email || !password) {
    res.status(400).json({
      message: "Invalid Data",
    });
    return;
  }
  try {
    const user = await registerService({ name, email, password });
    delete user._doc.password;
    return res.status(201).json({
      message: "user created successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const loginController = async (req, res, next) => {
  // destructing required information for registration
  const { email, password } = req.body;
  // basic level validation
  if (!email || !password) {
    res.status(400).json({
      message: "Invalid Data",
    });
    return;
  }
  try {
    const token = await loginService({ email, password });
    res.status(200).json({ message: `Login successful`, token });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerController,
  loginController,
};
