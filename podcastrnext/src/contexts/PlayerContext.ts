import { createContext } from 'react';

type Episode = {
    title:string;
    members: string;
    thumbnail: string;
    duration: string;
    url: string;
}

type playerContext = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
}

export const playerContext = createContext({} as playerContext); // String Vazia apenas para iniciar o tipo do contexto no caso: String