const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harsh@garwal";
const fetchUser=require("../middleware/fetchUser")
const { body, validationResult } = require('express-validator');

router.post("/createuser", [
    body("name", "Enter a name with atleat 5 characters").isLength({ min: 5 }),
    body("email", "Enter the email in correct email format").isEmail(),
    body("password", "Password must be of minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    //console.log(errors.errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ "error": "Email already exists" });
        }
        const salt = await bcrypt.genSaltSync(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        const real_user = await User.create({//This user.create returns a promise we can use async await here
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        const data = {
            user: {
                id: real_user.id
            }
        }
        //The Jsonweb token which we create has three part 1.algorithm 2.data 3.signature(JWT_SECRET)
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ authtoken });
    }
    catch (err) {
        console.error(err.message);
    }
})


router.post("/login", [
    body("email").isEmail(),
    body("password").exists()//This .exists indicates that the password block couldn't be empty
], async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);//This check is given if the conditions we have applied in the the email,password things if they go wrong then show the error
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (err) {
        res.json({ error: "Something went wrong" })
    }
})


router.post("/getuser",fetchUser,async(req,res)=>{
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;