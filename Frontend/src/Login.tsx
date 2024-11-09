import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Grid from "@mui/material/Grid";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    return <div style = {{ display : "flex", justifyContent : "center" }}>
      <Grid container>
      <Grid item lg = {7} md = {12} sm = {12}>
      <div style = {{ paddingTop : 200, marginLeft : 200 }}>
        <div style = {{ marginLeft : 250 }}>
          <Typography variant = {"h4"}>Pokemon era</Typography>
        </div>
        <img src = "https://wallpapercave.com/wp/wp12507738.jpg" style = {{ width : 700, height : 400 }} />
      </div>
      </Grid>
      <Grid item lg = {5} md = {12} sm = {12}>
      <div style = {{ paddingTop : 250, marginLeft : 200 }}>
        <div style = {{ paddingBottom : 10, marginLeft : 30 }}>
        <Typography variant = {"h6"} >Welcome back .Please login below</Typography>
        </div>
        <Card variant = "outlined" style = {{ width : 400, height : 220}}>
          <br/>
          <TextField value = {email}
          onChange = {(e) => (
            setEmail(e.target.value)
          )}
          style = {{ marginLeft : 20, width : 360, backgroundColor : "#ECFFFF" }}
          id = "outlined-basic"
          label = "username"
          variant = "outlined">
          </TextField>
          <br/><br/>
          <TextField value = {password}
           onChange = {(e) => (
            setPassword(e.target.value)
          )}
          style = {{ marginLeft : 20, width : 360, backgroundColor : "#ECFFFF" }}
          id = "outlined-basic"
          label = "password"
          variant = "outlined"
          type = {"password"}>
          </TextField>
          <br/><br/>
          <div style = {{ display : "flex", justifyContent : "center"}}>
            <Button onClick = {() => {
              function callback2(data : { Token : string}) {
                localStorage.setItem("Token", data.Token)
                window.location.href = "/"
              }
              function callback1(response : any) {
                response.json().then(callback2)
              }
              fetch("http://localhost:3000/login", {
                method : "POST",
                body : JSON.stringify({ username : email, password : password }),
                headers : { "Content-type" : "application/json"}
              }).then(callback1)
            }}
            variant = "contained">Login</Button>
          </div>
        </Card>
      </div>
      </Grid>
     </Grid>
    </div>
}

export default Login