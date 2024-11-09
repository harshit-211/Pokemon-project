import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Pokemon() {
    const [pokemon, setPokemon] = useState("");
    const [name, setName] = useState("");
    return <div>
        <div style = {{ display : "flex", justifyContent : "center", padding : 30 }}>
        <TextField 
        id = "outlined-basic"
        label = "enter name"
        variant = "outlined"
        onChange = {(e) => {
            setName(e.target.value);
        }}>
        </TextField>
        <div style = {{ padding : 10 }}>
            <Button onClick = {() => {
                function callback2(data : any) {
                    setPokemon(data);
                }
                function callback1(response : any) {
                    response.json().then(callback2)
                }
                fetch("http://localhost:3000/pokemon/name", {
                    method : "POST",
                    body : JSON.stringify({
                        name : name
                    }),
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem("Token")
                    }
                }).then(callback1)
            }}
            variant = "contained">
                Search
            </Button>
        </div>
        </div>
        <div>
            <ShowPokemon pokemon = {pokemon}></ShowPokemon>
        </div>
    </div>
}

function ShowPokemon(props : any) {
    return <div style = {{ display : "flex", justifyContent : "center" }}>
        <Card variant = "outlined" style = {{ width : 300, height : 380 }}>
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
export default Pokemon;