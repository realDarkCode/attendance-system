const express = require("express")
const User = require("../models/User");
const bcrypt = require('bcryptjs');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next
 */
const register = async (req, res, next) => {
    // destructing required information for registration 
    const { name, email, password } = req.body;
    // basic level validation
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Invalid Data"
        })
        return;
    }
    try {
        // check for user with same email address
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                message: "User already exist."
            })
            return;
        }
        // creating new user
        user = new User({ name, email, password })
        // hashing user password 
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        await user.save();
        delete user._doc.password;
        delete user._doc._id;
        delete user._doc.__v;
        return res.status(201).json({
            message: "user created successfully.",
            user
        })
    } catch (error) {
        next(error)
    }
}
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
    // destructing required information for registration 
    const { email, password } = req.body;
    // basic level validation
    if (!email || !password) {
        res.status(400).json({
            message: "Invalid Data"
        })
        return;
    }
    try {
        // check if there any user with that email
        const user =await User.findOne({email});
        if(!user) {
            res.status(400).json({
                message: "Invalid Credential"
            })
            return;
        }
        // match password with hashed form
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({
                message: "Invalid Credential"
            })
            return;
        }
        // Todo: generate token
        res.status(200).json({message: `You are logged in as ${user.name}`});
    } catch (error) {
        next(error)
    }
}
module.exports = {
    register, login
}