const express = require("express")
const User = require("../models/User");
const bcrypt = require('bcryptjs');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const register = async (req, res) => {
    // destructing required information for registration 
    const {name, email , password } = req.body;
    // basic level validation
    if (!name || !email|| !password) {
        res.status(400).json({
            message: "Invalid Data"
        })
        return;
    }
    // check for user with same email address
    let user = await User.findOne({email});
    if (user) {
        res.status(400).json({
            message: "User already exist."
        })
        return;
    }
    // creating new user
    user = new User({name,email,password})
    // hashing user password 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    return res.status(201).json({
        message: "user created successfully.",
        user
    })
} 

module.exports = {
    register
}