import mongoose from "mongoose";
import orgUserModel from "../model/model.OrgUser.js";
import empUserModel from "../model/model.employeeUser.js";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import config from '../Config.json' assert {type : "json"};


export const companyUserSignUp = async (req, res) => {

    const { name, email, password, CIN, employeeCount, industryType, branch } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await orgUserModel.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "User is already registered" });
        } else {
            const newUser = new orgUserModel({

                name,
                email,
                password: hashedPassword,
                CIN,
                employeeCount,
                industryType,
                branch

            });

            await newUser.save();
            return res.status(200).json({ message: "Account has been created!! Please Login" });
        }
    } catch (error) {
        console.error("Error in SignUp:", error);
        return res.status(500).json({ error: 'Registration failed' });
    }
};



export const companyUserSignIn = async (req, res) => {


    const { email, password } = req.body;

    try {
        
        const user = await orgUserModel.findOne({ email: email });

        if (user) {

            if (!user.password) {

                return res.status(400).json({ message: "User does not have a password set" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const accessToken = jwt.sign({
                    email: user.email,
                    user: {
                        name: user.name
                    }
                }, config.accessTokenSecretKey, {

                    expiresIn: '15m',

                });

                const refreshToken = jwt.sign({ email: user.email }, config.refreshTokenSecretKey, {
                    expiresIn: '7d',
                });

                return res.json({ message: "Login successfully", user: user, accessToken, refreshToken });
            } else {
                return res.status(400).json({ message: "Password and confirm password didn't match" });
            }
        } else {
            return res.status(400).json({ message: "Please login to proceed" });
        }
    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ error: 'Could not get user data' });
    }


}


export const employeeUserSignUp = async (req, res) => {


    const { name, email, password, CIN, employeeId, company, branch } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await empUserModel.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "User is already registered" });
        } else {
            const newUser = new empUserModel({

                name,
                email,
                password: hashedPassword,
                CIN,
                employeeId,
                company,
                branch

            });

            await newUser.save();
            return res.status(200).json({ message: "Account has been created!! Please Login" });
        }
    } catch (error) {
        console.error("Error in SignUp:", error);
        return res.status(500).json({ error: 'Registration failed' });
    }


}



export const employeeUserSignIn = async (req, res) => {


    const { email, password } = req.body;

    try {
        const user = await empUserModel.findOne({ email: email });

        if (user) {

            if (!user.password) {

                return res.status(400).json({ message: "User does not have a password set" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const accessToken = jwt.sign({
                    email: user.email,
                    user: {
                        name: user.name
                    }
                }, config.accessTokenSecretKey, {
                    expiresIn: '15m',
                });

                const refreshToken = jwt.sign({ email: user.email }, config.refreshTokenSecretKey, {
                    expiresIn: '7d',
                });

                return res.json({ message: "Login successfully", user: user, accessToken, refreshToken });
            } else {
                return res.status(400).json({ message: "Password and confirm password didn't match" });
            }
        } else {
            return res.status(400).json({ message: "Please login to proceed" });
        }
    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ error: 'Could not get user data' });
    }


}