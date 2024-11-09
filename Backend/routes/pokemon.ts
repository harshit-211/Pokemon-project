import express from 'express';
import { authenticateJwt } from '../authentication/auth';
import { Pokemon } from '../database';
import { pokemonInput } from '../input_validation';
import { pokemonName } from '../input_validation';

const router = express.Router();

router.post('/add/pokemon', authenticateJwt, async (req, res) => {
    const userId = req.headers['userId'];
    console.log("User ID in /add/pokemon route:", userId);
    const passedInput = pokemonInput.safeParse(req.body);
    if(!passedInput.success) {
        return res.status(411).json({ message : passedInput.error });
    }
    const id_number : number = passedInput.data.id_number;
    const name : string = passedInput.data.name;
    const type : string = passedInput.data.type;
    const strength : number = passedInput.data.strength;
    const image : string = passedInput.data.image;
    const newPokemon = new Pokemon({ id_number, name, type, strength, image });
    await newPokemon.save();
    res.status(200).json({ message : "Pokemon added successfully" });
});

router.post('/pokemon/name', authenticateJwt, async (req, res) => {
    const input = pokemonName.safeParse(req.body);
    if(!input.success) {
        return res.status(411).json({ message : input.error });
    }
    const name : string = input.data.name;
    const pokemon = await Pokemon.findOne({ name : name });
    if(pokemon) { res.status(200).json({
            id_number : pokemon.id_number,
            name : pokemon.name,
            type : pokemon.type,
            strength : pokemon.strength,
            image : pokemon.image
        });
    } else {
        res.status(403).json({ message : "pokemon not found" });
    }
});

router.get('/all/pokemon', authenticateJwt, async (req, res) => {
    const allPokemons = await Pokemon.find({});
    res.status(200).json({ allPokemons });
});

export default router;