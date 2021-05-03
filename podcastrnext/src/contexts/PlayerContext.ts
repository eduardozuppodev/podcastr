import { createContext } from 'react';

type Episode = {
    title:string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type playerContext = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
}

export const playerContext = createContext({} as playerContext); // String Vazia apenas para iniciar o tipo do contexto no caso: String