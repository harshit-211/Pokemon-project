import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authorizationroutes from '../routes/authorization';
import pokemonroutes from '../routes/pokemon';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/', authorizationroutes);
app.use('/', pokemonroutes);



// connecting to mongoDb
mongoose.connect("mongodb+srv://harshitpassi:Y82ROR8OY@atlascluster.mg1y4r0.mongodb.net/", { dbName: "pokemon" })
    .then(() => {
        console.log("Connected to MongoDB");
        // connecting to port 
        app.listen(port, () => {
            console.log(`Server working on http://localhost:${port}`)
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });
