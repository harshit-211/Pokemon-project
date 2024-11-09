import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function Signup() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    return <div>
        <div style = {{
            display : "flex",
            justifyContent : "space-between"
        }}>   
        <img src = "https://preview.redd.it/every-pokemon-in-a-single-image-v0-of9ktyw8s2ac1.jpeg?auto=webp&s=6734e1bece621155a4e3b4de1bbcf63617d21df8" style = {{
            width : 800,
            paddingTop : 250,
            marginLeft : 200,
            height : 400
        }} />

        <div style = {{
            marginRight : 300,
            paddingTop : 250
        }}>
            <Typography variant = {"h6"}>Welcome to the pokemon website.Please signup below</Typography>
            <div style = {{
                paddingTop : 20
            }}>
                <Card variant = "outlined" style = {{ width : 400, height : 220 }}>
                    <br/>
                    <TextField onChange = {(e) => (
                        setEmail(e.target.value)
                    )}
                    style = {{ marginLeft : 20, width : 360, backgroundColor : "#ECFFFF" }}
                    id = "outlined"
                    label = "username"
                    variant = "outlined">
                    </TextField>
                    <br/>
                    <br/>
                    <TextField onChange = {(e) => (
                        setPassword(e.target.value)
                    )}
                    style = {{ marginLeft : 20, width : 360, backgroundColor : "#ECFFFF" }}
                    id = "outlined"
                    label = "password"
                    variant = "outlined"
                    type = "password">
                    </TextField>
                    <br/>
                    <br/>
                    <div style = {{
                        display : "flex",
                        justifyContent : "center"
                    }}>
                        <Button onClick = { () => {
                            function callback2(data : { Token : string }) {
                                localStorage.setItem("Token", data.Token)
                                window.location.href = "/"
                            }
                            function callback1(response : any) {
                                response.json().then(callback2)
                            }
                            fetch("http://localhost:3000/signup", {
                                method : "POST",
                                body : JSON.stringify({ username : email, password : password }),
                                headers : { "Content-type" : "application/json" }
                            }).then(callback1)
                        }}
                        variant = "contained">Signup</Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</div>
}

export default Signup