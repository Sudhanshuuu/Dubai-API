const express = require('express');
const User = require('../models/Authentication');
const router = express.Router();
require('dotenv').config();

const bcrypt = require('bcrypt')
const saltRounds = 10;

// Define your routes
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ email, password: hash, name });
        await newUser.save();

        return res.status(200).json({ name: newUser.name, email: newUser.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/login', async (req, res) => {


    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).json({ message: "invalid credential" });
        }

        return res.status(200).json({ name: user.name, email: user.email });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});


module.exports = router;
