import { useState } from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Allpokemons() {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        function callback2(data : any) {
            setPokemons(data.allPokemons);
            console.log(data);
        }
        function callback1(response : any) {
            response.json().then(callback2)
        }
        fetch("http://localhost:3000/all/pokemon", {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("Token")
            }
        }).then(callback1)
    }, []);
    return <div>
        <div style = {{ display : "flex", flexWrap : "wrap", justifyContent : "center", padding : 30 }}>
            {pokemons.map(pokemon => (<Pokemons pokemon = {pokemon}/>))}
        </div>
    </div>
}

function Pokemons(props : any) {
    return <div>
        <Card variant = "outlined" style = {{ width : 300, height : 380, margin : 20 }}>
            <img src = {props.pokemon.image} style = {{ width : 300, height : 250 }} />
            <Typography textAlign = "center" variant = {"h6"}>
                {props.pokemon.id_number}
            </Typography>
            <Typography textAlign = "center" variant = {"h6"}>
                {props.pokemon.name}
            </Typography>
            <Typography textAlign = "center" variant = {"h6"}>
                {props.pokemon.type}
            </Typography>
            <Typography textAlign = "center" variant = {"h6"}>
                {props.pokemon.strength}
            </Typography>
        </Card>
    </div>
}
export default Allpokemons;