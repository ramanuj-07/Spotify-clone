import './App.css';
import styled from 'styled-components';

function App() {
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
            <input type="text" id="searchInput" placeholder="Search song" />
            <button onClick="">
              <span className="material-symbols-outlined">
                search
              </span>
            </button>
          </li>
        </ul>
      </NavigationBar>
      <Container>


      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
    background-color: black;
    color: white;
    display: flex;
    margin: 23px auto;
    width: 70%;
    border-radius: 12px;
    padding: 20px;
    background-image: url('depositphotos_21380509-stock-illustration-music-equaliser-1.jpeg');

`

const NavigationBar = styled.div`
  font-family: 'Montserrat', sans-serif;

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
    /* cursor: pointer; */
  }
`;
