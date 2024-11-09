"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonName = exports.pokemonInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(30),
    password: zod_1.z.string().min(6).max(20)
});
exports.pokemonInput = zod_1.z.object({
    id_number: zod_1.z.number().min(1).max(100),
    name: zod_1.z.string().min(1).max(15),
    type: zod_1.z.string().min(1).max(10),
    strength: zod_1.z.number().min(100).max(10000),
    image: zod_1.z.string().min(1).max(100)
});
exports.pokemonName = zod_1.z.object({
    name: zod_1.z.string().min(1).max(15)
});
