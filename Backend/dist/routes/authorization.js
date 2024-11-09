"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const auth_1 = require("../authentication/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const input_validation_1 = require("../input_validation");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = input_validation_1.signUpInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ message: parsedInput.error });
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const user = yield database_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    }
    else {
        const newUser = new database_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, auth_1.SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User created successfully", Token: token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paresedInput = input_validation_1.signUpInput.safeParse(req.body);
    if (!paresedInput.success) {
        return res.status(411).json({ message: paresedInput.error });
    }
    const username = paresedInput.data.username;
    const password = paresedInput.data.password;
    const userAlready = yield database_1.User.findOne({ username, password });
    if (userAlready) {
        const token = jsonwebtoken_1.default.sign({ id: userAlready._id }, auth_1.SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in successfully", Token: token });
    }
    else {
        res.status(404).json({ message: "Cannot find any user" });
    }
}));
router.get("/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    console.log("User ID in /me route:", userId);
    const user = yield database_1.User.findOne({ _id: userId });
    if (user) {
        res.status(200).json({ username: user.username });
    }
    else {
        res.status(403).json({ message: "User not logged in" });
    }
}));
exports.default = router;
