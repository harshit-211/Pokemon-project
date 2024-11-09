import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : String,
    password : String
});

const pokemonSchema = new mongoose.Schema({
    id_number : Number,
    name : String,
    type : String,
    strength : Number,
    image : String
});

export const User = mongoose.model("userschemas", userSchema);
export const Pokemon = mongoose.model("pokemonschemas", pokemonSchema);