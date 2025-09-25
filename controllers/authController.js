const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { syncIndexes } = require('mongoose');

const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 30 * 24 * 60 * 60 * 1000 
            })
            .json({user, token});
    } catch(err){
        res.status(400).json({ error: err.message });
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) throw new Error('User not found');
        const valid = bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid credentials');
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            .json({user, token});
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {signup, login}