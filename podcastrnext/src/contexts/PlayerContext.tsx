import { createContext, useState, ReactNode, useContext } from 'react';

// Tipagem Episódio
type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

// Tipagem Contexto
type playerContext = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () =>void;
    toggleShuffle: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const playerContext = createContext({} as playerContext); // String Vazia apenas para iniciar o tipo do contexto no caso: String


type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);


    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {
        if (isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    return (
        <playerContext.Provider
            value={{
                currentEpisodeIndex,
                episodeList,
                play,
                playList,
                playNext,
                playPrevious,
                isPlaying,
                isShuffling,
                isLooping,
                togglePlay,
                hasNext,
                hasPrevious,
                setPlayingState,
                toggleLoop,
                toggleShuffle,
            }}>
            {children}
        </playerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(playerContext);
}
