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
const auth_1 = require("../authentication/auth");
const database_1 = require("../database");
const input_validation_1 = require("../input_validation");
const input_validation_2 = require("../input_validation");
const router = express_1.default.Router();
router.post('/add/pokemon', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers['userId'];
    console.log("User ID in /add/pokemon route:", userId);
    const passedInput = input_validation_1.pokemonInput.safeParse(req.body);
    if (!passedInput.success) {
        return res.status(411).json({ message: passedInput.error });
    }
    const id_number = passedInput.data.id_number;
    const name = passedInput.data.name;
    const type = passedInput.data.type;
    const strength = passedInput.data.strength;
    const image = passedInput.data.image;
    const newPokemon = new database_1.Pokemon({ id_number, name, type, strength, image });
    yield newPokemon.save();
    res.status(200).json({ message: "Pokemon added successfully" });
}));
router.post('/pokemon/name', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = input_validation_2.pokemonName.safeParse(req.body);
    if (!input.success) {
        return res.status(411).json({ message: input.error });
    }
    const name = input.data.name;
    const pokemon = yield database_1.Pokemon.findOne({ name: name });
    if (pokemon) {
        res.status(200).json({
            id_number: pokemon.id_number,
            name: pokemon.name,
            type: pokemon.type,
            strength: pokemon.strength,
            image: pokemon.image
        });
    }
    else {
        res.status(403).json({ message: "pokemon not found" });
    }
}));
router.get('/all/pokemon', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPokemons = yield database_1.Pokemon.find({});
    res.status(200).json({ allPokemons });
}));
exports.default = router;
