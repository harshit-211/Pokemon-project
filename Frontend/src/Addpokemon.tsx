import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

function Addpokemon() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [strength, setStrength] = useState(0);
    const [image, setImage] = useState("");
    const [shownName, setShownName] = useState("");
    return <div>
        <div style = {{ padding : 5, marginBottom : -70}}>
            <Card variant = "outlined" style = {{ height : 250, backgroundColor : "black" }}>
                <div style = {{ color : "white", display : "flex", justifyContent : "center", padding : 95 }}>
                    <Typography variant = {"h4"}>
                        {shownName}
                    </Typography>
                </div>
            </Card>
        </div>
            <div style = {{ display : "flex", justifyContent : "space-between"}}>
            <div>
            <Card variant = "outlined" style = {{ width : 550, height : 450, marginLeft : 80 }}>
                <br/>
                <TextField onChange = {(e) => {
                    setId(Number(e.target.value))
                }}
                style = {{ marginLeft : 20, width : 510, backgroundColor : "#ECFFFF" }}
                id = "outlined-basic"
                label = "id"
                variant = "outlined">
                </TextField>
                <br/><br/>
                <TextField onChange = {(e) => {
                    setName(e.target.value)
                }}
                style = {{ marginLeft : 20, width : 510, backgroundColor : "#ECFFFF" }}
                id = "outlined-basic"
                label = "name"
                variant = "outlined">    
                </TextField>
                <br/><br/>
                <TextField onChange = {(e) => {
                    setType(e.target.value)
                }}
                style = {{ marginLeft : 20, width : 510, backgroundColor : "#ECFFFF" }}
                id = "outlined-basic"
                label = "type"
                variant = "outlined">
                </TextField>
                <br/><br/>
                <TextField onChange = {(e) => {
                    setStrength(Number(e.target.value))
                }}
                style = {{ marginLeft : 20, width : 510, backgroundColor : "#ECFFFF" }}
                id = "outlined-basic"
                label = "strength"
                variant = "outlined">
                </TextField>
                <br/><br/>
                <TextField onChange = {(e) => {
                    setImage(e.target.value)
                }}
                style = {{ marginLeft : 20, width : 510, backgroundColor : "#ECFFFF" }}
                id = "outlined-basic"
                label = "image"
                variant = "outlined">
                </TextField>
                <br/><br/>
                <div style = {{ display : "flex", justifyContent : "center" }}>
                    <Button onClick = {() => {
                        function callback2(data : any) {
                            alert("pokemon added")
                            setShownName(name);
                            console.log(data);
                        }
                        function callback1(response : any) {
                            response.json().then(callback2)
                        }
                        fetch("http://localhost:3000/add/pokemon", {
                            method : "POST",
                            body : JSON.stringify({
                                id_number : id,
                                name : name,
                                type : type,
                                strength : strength,
                                image : image
                            }), headers : {
                                "Content-type" : "application/json",
                                "Authorization" : "Bearer " + localStorage.getItem("Token")
                            }
                        }).then(callback1)
                    }}
                    variant = "contained">Add pokemon</Button>
                </div>
            </Card>
            </div>
        </div>
    </div>
}

export default Addpokemon;