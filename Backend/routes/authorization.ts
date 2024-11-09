import express from 'express';
import { User } from '../database';
import { authenticateJwt, SECRET } from '../authentication/auth';
import jwt from 'jsonwebtoken';
import { signUpInput } from '../input_validation';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const parsedInput = signUpInput.safeParse(req.body);
    if(!parsedInput.success) {
        return res.status(411).json({ message : parsedInput.error });
    }
    const username : string = parsedInput.data.username;
    const password : string = parsedInput.data.password;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User created successfully", Token: token });
    }
});

router.post('/login', async (req, res) => {
    const paresedInput = signUpInput.safeParse(req.body);
    if(!paresedInput.success) {
        return res.status(411).json({ message : paresedInput.error });
    }
    const username : string = paresedInput.data.username;
    const password : string = paresedInput.data.password;
    const userAlready = await User.findOne({ username, password });
    if (userAlready) {
        const token = jwt.sign({ id: userAlready._id }, SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in successfully", Token: token });
    } else {
        res.status(404).json({ message: "Cannot find any user" });
    }
});

router.get("/me", authenticateJwt, async (req, res) => {
    const userId = req.headers["userId"];
    console.log("User ID in /me route:", userId);
    const user = await User.findOne({ _id: userId });
    if (user) {
        res.status(200).json({ username: user.username });
    } else {
        res.status(403).json({ message: "User not logged in" });
    }
});

export default router;