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

const saltround = 10; // Number of rounds for bcrypt hashing

const visterSignin = async(req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if any required field is missing
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email is already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, saltround);

        // Create a new user with hashed password
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Generate a JWT token for the newly registered user
        const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

//login here
const visiterLogin = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required (email and password)' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '3d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error in login', error });
    }
}

module.exports = { visterList, visiterPost, visterSignin, visiterLogin, }