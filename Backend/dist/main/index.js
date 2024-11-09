"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authorization_1 = __importDefault(require("../routes/authorization"));
const pokemon_1 = __importDefault(require("../routes/pokemon"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', authorization_1.default);
app.use('/', pokemon_1.default);
// connecting to mongoDb
mongoose_1.default.connect("mongodb+srv://harshitpassi:Y82ROR8OY@atlascluster.mg1y4r0.mongodb.net/", { dbName: "pokemon" })
    .then(() => {
    console.log("Connected to MongoDB");
    // connecting to port 
    app.listen(port, () => {
        console.log(`Server working on http://localhost:${port}`);
    });
})
    .catch(err => {
    console.error("Failed to connect to MongoDB", err);
});
