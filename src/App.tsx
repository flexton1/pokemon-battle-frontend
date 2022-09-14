import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

const PokemonTable = React.lazy(() => import('./components/PokemonTable/PokemonTable'));


function App() {
  return (
    <React.Fragment>
      <Navbar />
       <Routes>
        <Route path="*" element={
          <React.Suspense>
            <NoMatch />
          </React.Suspense>
        } />

        <Route path={'/'} element={
          <React.Suspense fallback={<>...</>}>
            <PokemonTable  />
          </React.Suspense>
        } />
        </Routes>
    </React.Fragment>
  );
}

export default App;

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
