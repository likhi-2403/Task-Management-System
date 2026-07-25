const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {

    console.log("STEP 1");

    const { name, email, password } = req.body;

    console.log("STEP 2");

    const existingUser = await User.findOne({ email });

    console.log("STEP 3");

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already registered"
        });
    }

    console.log("STEP 4");

    const user = new User({
        name,
        email,
        password
    });

    console.log("STEP 5");

    await user.save();

    console.log("STEP 6");

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
    });
};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: "1d" }

        );

        res.json({

            success: true,
            message: "Login successful",
            token

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    registerUser,
    loginUser

};