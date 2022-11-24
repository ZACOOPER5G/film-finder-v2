import './App.css';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { FilmForm } from './components/FilmForm';
import { useState } from 'react';

function App() {
  const [movie, setMovie] = useState<Boolean>(false);
  const [show, setShow] = useState<Boolean>(false);

  return (
    <div className="App">
      <Navbar />
      {/* @ts-ignore */}
      <Header setShow={setShow} show={show} setMovie={setMovie} movie={movie} />
      {
        // @ts-ignore
        (movie || show) && <FilmForm movie={movie} show={show} />
      }
    </div>
  );
}

export default App;
