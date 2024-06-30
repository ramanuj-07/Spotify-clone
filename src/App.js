import { useEffect, useState } from 'react';
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
            <div className='searchContainer'>
              <input type="text" id="searchInput" placeholder="Search song" />
              <button onClick="" className='searchBtn'>
                <span class="material-icons">
                  search
                </span>
              </button>
            </div>
          </li>
        </ul>
      </NavigationBar>

      <Container>
        <div className="songlist">
          <span className="material-symbols-outlined">Best of 2023</span>
          {songs.map(song => (
            <div className="songItems" key={song.track.id}>
              <img src={song.track.album.images[0].url} alt="SongImg" />
              <span>{song.track.name} - {song.track.artists[0].name}</span>
              <span className="songListPlay">
                <span className="time">{Math.floor(song.track.duration_ms / 60000)}:{Math.floor((song.track.duration_ms % 60000) / 1000).toFixed(0)}</span>
                <span className="material-icons">play_circle</span>
              </span>
            </div>
          ))}
        </div>

      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
    background-color: black;
    min-height: 80vh;
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

  .material-icons {
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

  .searchButton {
    position: absolute;
    right: 10px; /* Adjust this value to properly position the icon */
    background: none;
    border: none;
    cursor: pointer;
  }

  .material-icons {
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

