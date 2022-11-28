import './App.css';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { FilmForm } from './components/FilmForm';
import { useState } from 'react';
import { FilmPoster } from './components/FilmPoster';
import { Spinner } from 'react-bootstrap';

function App() {
  const [movie, setMovie] = useState(false);
  const [show, setShow] = useState(false);
  const [chosenFilm, setChosenFilm] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar />
      {/* @ts-ignore */}
      <Header setShow={setShow} show={show} setMovie={setMovie} movie={movie} />
        {
          // @ts-ignore
          (movie || show) && (
              <FilmForm setMovie={setMovie} movie={movie} setShow={setShow} show={show} setChosenFilm={setChosenFilm} setLoading={setLoading} />
          ) 
        }
        {
          loading && (
            <div className="loading" >
              {/* @ts-ignore */}
              <h2>Loading selection</h2>
              <Spinner animation="grow" variant="light" />
              <Spinner animation="grow" variant="light"  />
              <Spinner animation="grow" variant="light"  />
            </div>
          )

        }
        {
          // @ts-ignore
          chosenFilm && <FilmPoster chosenFilm={chosenFilm} />
        }
    </div>
  );
}

export default App;
