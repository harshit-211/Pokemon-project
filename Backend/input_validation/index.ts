import { z } from 'zod';

export const signUpInput = z.object({
    username : z.string().min(1).max(30),
    password : z.string().min(6).max(20)
});

export const pokemonInput = z.object({
    id_number : z.number().min(1).max(100),
    name : z.string().min(1).max(15),
    type : z.string().min(1).max(10),
    strength : z.number().min(100).max(10000),
    image : z.string().min(1).max(100)
});

export const pokemonName = z.object({
    name : z.string().min(1).max(15)
});
