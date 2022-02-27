import React from 'react';
import { Link, Route, Routes  } from 'react-router-dom';
import camera from 'Assets/Images/camera.png'
import './Styles/main.scss'
import MovieSearch from 'Components/MovieSearch/MovieSearch';
import MovieDetails from 'Components/MovieDetails/MovieDetails';

function App() {
  return (
    <div>
      <div className="appWrapper">
        <div className="navBar">
          <Link to={"/"} className="logo">
            <img src={camera} />
            <h2>Nappo Movies</h2>
          </Link>
        </div>
        <div className="mainSwitch">
          <Routes>
            <Route path={"/"} element={<MovieSearch />} />
            <Route path={"/movie/:movie_id"} element={<MovieDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
