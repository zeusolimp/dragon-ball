import { Character, CharactersModel } from "@/model/character.model";

const API_URL = "https://dragonball-api.com/api/characters";

export const getCharacters = async () => {
    const response = await fetch(API_URL);
    const data: CharactersModel = await response.json();
    return data;
};

export const getCharacterById = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        
        //podemos usar este metodo para guarda en cache la respuesta
        //cache: "force-cache",

        //O podemos usar este metodo para guarda en cache la respuesta pero en 
        //un periodo de tiempo determinado para garantizar que este actualizada
        next: {
            //revalida la respuesta cada periodo de 24 horas
            revalidate: 60*60*24,
        },

    });
    const data: Character = await response.json();
    return data;
};
