import { useState, useEffect } from "react";
import GifList from "./GifList";
import SearchBar from "./SearchBar";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
const axios = require("axios");

function App() {
  const [gifs, setGifs] = useState([]);

  let initialFavorites = new Map();
  const localStorageFavorites = window.localStorage.getItem("favorites");
  if (localStorageFavorites) {
    initialFavorites = new Map(JSON.parse(localStorageFavorites));
  }

  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const handleTermChange = async (term) => {
    if (term) {
      let limit = 50;
      if (window.innerWidth < 400) {
        limit = 10;
      } else if (window.innerWidth < 700) {
        limit = 15;
      } else if (window.innerWidth < 900) {
        limit = 20;
      }
      const url = `https://api.giphy.com/v1/gifs/search?q=${term.replace(
        /\s/g,
        "+"
      )}&api_key=54YWDzpnKwpreX21oW4jevboPLRjbRF5&limit=${limit}`;

      const gifs = await axios.get(url);
      if (gifs.data) {
        setGifs(gifs.data.data);
      }
    }
  };

  const addToFavorites = (gif) => {
    setFavorites((prev) => new Map([...prev, [gif.id, gif]]));
  };

  const removeFromFavorites = (gif) => {
    setFavorites((prev) => {
      const newState = new Map(prev);
      newState.delete(gif.id);
      return newState;
    });
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/home" />;
          }}
        />
        <Route path="/home">
          <div>
            <Header homeActive={true} favoritesActive={false} />
            <SearchBar onTermChange={handleTermChange} />
            <GifList
              gifs={gifs}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              favorites={favorites}
            />
          </div>
        </Route>
        <Route path="/favorites">
          <div>
            <Header homeActive={false} favoritesActive={true} />
            <GifList
              gifs={Array.from(favorites.values())}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              favorites={favorites}
            />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
