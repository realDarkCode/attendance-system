const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const authenticate = async (req, res, next) => {
  try {
    // check if there is any token with request
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // verify the token
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    // check if there is a user in database
    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // generate some user data to next controller
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }
};

module.exports = authenticate;
