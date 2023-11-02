import { log } from "console";
import express from "express";
import {
  getMultiplePokemon,
  getPokemonByID,
  getSimplePokemonByID,
} from "./controllers/Pokemon";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/pokemon/full/:id", getPokemonByID);

app.get("/pokemon/simple/:id", getSimplePokemonByID);

app.get("/pokemon/multiple", getMultiplePokemon);

app.listen(PORT, () => {
  console.log(`Server corriendo el puerto ${PORT}`);
  console.log(`Puto el que lee`);
  
});
