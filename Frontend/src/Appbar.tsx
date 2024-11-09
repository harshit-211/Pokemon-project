import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Appbar() {
    const [userEmail, setUserEmail] = useState(null);
    useEffect(() => {
        function callback1(response : any) {
            response.json().then(callback2)
        }
        function callback2(data : any) {
            if(data.username) {
                setUserEmail(data.username);
            }
        }
        fetch("http://localhost:3000/me", {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("Token")
            }
        }).then(callback1)
    },[]);
    const navigate = useNavigate();

    if(userEmail) {
        return <div style = {{ display : "flex", justifyContent : "space-between" }}>
        <div style = {{ display : "flex", justifyContent : "flex-start" }}>
            <Typography variant = {"h5"} style = {{ padding : 5 }}>Pokemon era</Typography>
            <div style = {{ padding : 5 }}>
                <Button onClick = {() => {
                    window.location.href = "/addpokemon";
                }}
                variant = "text">Add pokemon</Button>
            </div>
            <div style = {{ padding : 5 }}>
                <Button onClick = {() => {
                    window.location.href = "/allpokemons";
                }}
                variant = "text">All pokemons</Button>
            </div>
            <div style = {{ padding : 5 }}>
                <Button onClick = {() => {
                    window.location.href = "/pokemon/name";
                }}>
                    Search for pokemon
                </Button>
            </div>
        </div>
        <div style = {{ display : "flex", justifyContent : "flex-end"}}>
            <div style = {{ padding : 5 }}>
                <Typography variant = {"h6"}>{userEmail}</Typography>
            </div>
            <div style = {{ padding : 5 }}>
                <Button onClick = {() => {
                    localStorage.setItem("Token", "null")
                    window.location.href = "/";
                }}
                variant = "contained">Logout</Button>
            </div>
        </div>
    </div>
    }
    
    return <div style = {{ display : "flex", justifyContent : "space-between" }}>
        <div>
            <Typography variant = {"h5"} style = {{ padding : 5 }}>Pokemon era</Typography>
        </div>
        <div style = {{ display : "flex", justifyContent : "flex-end"}}>
            <div style = {{ padding : 5 }}>
                <Button onClick = {() => {
                    navigate("/signup");
                }}
                 variant = "contained">Signup</Button>
            </div>
            <div style = {{ padding : 5 }}>
                <Button onClick = {() => {
                    navigate("/login");
                }}
                variant = "contained">Login</Button>
            </div>
        </div>
    </div>
}

export default Appbar;