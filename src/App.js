import { useEffect, useState, useRef } from 'react';
import './App.css';
import styled from 'styled-components';


const getSpotifyToken = async () => {
  const clientId = '';
  const clientSecret = '';
  const authUrl = 'https://accounts.spotify.com/api/token';

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
};

function App() {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState(''); // State to manage search query
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgressBar((audio.currentTime / audio.duration) * 100);
      }
    };
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  const searchSongs = async (query) => {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=8`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const data = await response.json();
    setSongs(data.tracks.items);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchSongs(query);
  };

  const playTrack = (track) => {
    if (audioRef.current) {
      if (currentTrack && currentTrack.id === track.id && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = track.preview_url;
        audioRef.current.play();
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    }
  };

  const handleMasterPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  const handleProgressChange = (event) => {
    if (audioRef.current) {
      const newTime = (audioRef.current.duration * event.target.value) / 100;
      audioRef.current.currentTime = newTime;
      setProgressBar(event.target.value);
    }
  };

  return (
    <div className="App">
      <NavigationBar>
        <ul>
          <li className="brand">
            <img src="Spotify_icon.svg.webp" alt="Logo" /> Spotify
          </li>
          <li className="icons">Home</li>
          <li className="icons">About</li>
          <li className="searchBar">
            <form className="searchContainer" onSubmit={handleSearch}>
              <input
                type="text"
                id="searchInput"
                placeholder="Search song"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="searchButton">
                <span className="material-symbols-outlined">
                  Search
                </span>
              </button>
            </form>
          </li>
        </ul>
      </NavigationBar>
      <Container>
        <div className="songlist">
          {/* <span className="material-symbols-outlined">Results</span> */}
          {songs.map(song => (
            <div className="songItems" key={song.id}>
              <img src={song.album.images[0].url} alt="SongImg" />
              <span>{song.name} - {song.artists[0].name}</span>
              <span className="songListPlay" onClick={() => playTrack(song)}>
                <span className="time">{Math.floor(song.duration_ms / 60000)}:{Math.floor((song.duration_ms % 60000) / 1000).toFixed(0)}</span>

                <span className="material-symbols-outlined">{currentTrack && currentTrack.id === song.id && isPlaying ? 'pause_circle' : 'play_circle'} play_circle</span>
              </span>
            </div>
          ))}
        </div>
      </Container>

      <SongTrack>
        <input type="range" className="range" min="0" max="100" id="myProgressBar"  value={progressBar} 
          onChange={handleProgressChange}  />
        <div className="icons">
          <span className="material-symbols-outlined">skip_previous</span>
          <span className="material-symbols-outlined" id="masterPlay" onClick={handleMasterPlayPause}>
            {isPlaying ? 'pause_circle' : 'play_circle'}
          </span>
          <span className="material-symbols-outlined">skip_next</span>
        </div>
        <div className="playMusic">
          {currentTrack && (
            <>
              <img src={currentTrack.album.images[0].url} alt="Song Img" id="gif" />
              {currentTrack.name} - {currentTrack.artists[0].name}
            </>
          )}
        </div>
      </SongTrack>
      <audio ref={audioRef} />
    </div>
  );
}

export default App;

const SongTrack = styled.div`
    background-color: black;
    position: sticky;
    height: 90px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-direction: column;


#myProgressBar {
    width: 80vw;
    cursor: pointer;
}
  .range {
    flex-grow: 1;
    margin-right: 20px;
  }

  .icons {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .playMusic {
    display: flex;
    align-items: center;
  }

  #gif {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .material-symbols-outlined {
    cursor: pointer;
    font-size: 36px;
    margin: 0 5px;
  }
`;


const Container = styled.div`
    background-color: black;
    min-height: 71vh;
    color: white;
    display: flex;
    margin: 23px auto;
    width: 70%;
    border-radius: 12px;
    padding: 20px;
    background-image: url('depositphotos_21380509-stock-illustration-music-equaliser-1.jpeg');

    .songlist {
    padding: 20px;
  }

  .songItems {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .songItems img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .songListPlay {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .material-symbols-outlined {
    cursor: pointer;
  }

`

const NavigationBar = styled.div`
  font-family: 'Montserrat', sans-serif;

  .searchContainer {
    position: relative;
    display: flex;
    align-items: center;
  }

  input {
    padding: 6px 36px 6px 12px; /* Added right padding to make space for the icon */
    width: 200px;
  }

  .searchBtn {
    position: absolute;
    right: 10px; /* Adjust this value to properly position the icon */
    background: none;
    border: none;
    cursor: pointer;
  }

  .material-symbols-outlined {
    font-size: 20px; /* Adjust icon size if needed */
  }

  input {
    padding: 6px;
    width: 200px;
    margin-left: 650px;
  }

  ul {
    display: flex;
    list-style-type: none;
    height: 60px;
    background-color: black;
  }

  li {
    padding: 0 15px;
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .brand img {
    width: 45px;
}

.brand {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bolder;
    cursor: pointer;
}
`;

