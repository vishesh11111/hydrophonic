const express = require("express");
const UserModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")

const newToken = (user) => {
    // return jwt.sign({ user }, process.env.scret);
    return jwt.sign({ user }, "hello");
};

const SignUp = async (req, res) => {
    try {
        let body = req.body;
        const user = await UserModel.findOne({ 'user.email': body.email });
        if (user) {
            res.status(400).send({ status: false, message: "User Alredy exixt" })
        } else {
            const data = {
                "user": {
                    "name": body?.name,
                    "email": body?.email,
                    "number": body?.number,
                    "address": body?.address
                },
                "password": body?.password,
                "avatar": req?.file?.path,
            }
            const users = await UserModel.create(data);
            res.status(200).json({ status: true, message: "User SignUp succefully", data: users })
        }
    } catch (error) {
        console.log(error);
    }
}


const SignIn = async (req, res) => {
    try {
        let body = req.body;
        const user = await UserModel.findOne({ 'user.email': body.email });
        if (user) {
            const matchPas = await user.matchPassword(body.password);
            if (!matchPas) {
                res.status(400).send({ status: false, message: "Check Email or Password" })
            } else {
                const token = newToken(user);
                res.status(200).json({ status: true, message: "Login succefully", data: user , token: token})
            }
        } else {
            res.status(400).send({ status: false, message: "SignUp First" })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message,})
    }
}


module.exports = { SignUp, SignIn }