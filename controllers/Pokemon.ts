import { Request, Response } from "express";
import axios from "axios";
import { MultiplePokeObject, Pokemon } from "../interfaces/pokemon";

export const getPokemonByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

  res.json({
    data,
  });
};

export const getSimplePokemonByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const { name, order, sprites, abilities, types }: Pokemon = data;

  const bestImg = sprites.other?.dream_world.front_default;

  const simplePokemon = {
    name,
    order,
    bestImg,
    abilities,
    types,
  };

  res.json({
    simplePokemon,
  });
};

export const getMultiplePokemon = async (req: Request, res: Response) => {
  const { limit = 5, offset = 0 } = req.query;

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );

  const pokemondataUrls: string[] = response.data.results.map(
    (pokemon: MultiplePokeObject) => pokemon.url
  );

  const finalPokemonData = await Promise.all(
    pokemondataUrls.map(async (url: string) => {
      const pokemonData = await axios.get(url);
      return pokemonData.data;
    })
  );

  res.json({
    finalPokemonData,
  });
};
