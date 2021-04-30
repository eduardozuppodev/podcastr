import '../styles/global.scss';

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from '../styles/app.module.scss';
import { playerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);


  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <playerContext.Provider value={{ currentEpisodeIndex, episodeList, play}}> 
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </playerContext.Provider>
  )
}

export default MyApp
