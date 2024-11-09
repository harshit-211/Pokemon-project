import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Appbar from "./Appbar";
import Addpokemon from "./Addpokemon";
import Allpokemons from "./Allpokemons";
import Pokemon from "./Pokemon";


function App() {
  return <div style = {{
    width : "100vw",
    height : "100vh",
    backgroundColor : "#eeeeee"
  }}>

    <Router>
      <Appbar/>
      <Routes>
        <Route path = "/signup" element = {<Signup/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/addpokemon" element = {<Addpokemon/>} />
        <Route path = "/allpokemons" element = {<Allpokemons/>} />
        <Route path = "/pokemon/name" element = {<Pokemon/>} />
      </Routes>
    </Router>
  </div>
}

export default App