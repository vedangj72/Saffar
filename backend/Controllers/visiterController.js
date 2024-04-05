// get visiter data list
const Pin = require("../Models/visiterModel");
const User = require("../Models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const visterList = async(req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json({ message: 'Error getting pins or locations ', error });
    }
}

const visiterPost = async(req, res) => {
    try {
        const newPin = await Pin.create(req.body);
        res.status(201).json(newPin); // 201 status code for successful creation
    } catch (error) {
        res.status(500).json({ message: 'Error creating pin', error });
    }
};

const saltround = 10;

const visterSignin = async(req, res) => {
    try {
        const { username, email, password } = req.body || {};
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = await User.create({ username, email, password });
        res.status(200).json({ message: 'User created successfully', user });
        // console.log("user created");

    } catch (error) {
        res.status(500).json({ message: 'Error in signin ', error });
    }
}

const visiterLogin = async(req, res) => {

}
module.exports = { visterList, visiterPost, visterSignin, visiterLogin, }