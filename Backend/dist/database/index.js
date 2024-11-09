"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String
});
const pokemonSchema = new mongoose_1.default.Schema({
    id_number: Number,
    name: String,
    type: String,
    strength: Number,
    image: String
});
exports.User = mongoose_1.default.model("userschemas", userSchema);
exports.Pokemon = mongoose_1.default.model("pokemonschemas", pokemonSchema);
