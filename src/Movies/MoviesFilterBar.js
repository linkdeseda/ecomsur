import '../App.css';
import React, {useState} from 'react';

const MoviesFilterBar = (props) => {

  const [movieInput, setMovieInput] = useState('');

  const handleChange = (event) =>{
    setMovieInput(event.target.value);
  }

  //Funcion que devuelve los states al componente padre y vuelven a renderizar la vista
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const inputReplace = movieInput.split(' ').join('+');
      props.typeMovies('');
      props.filterMovies(inputReplace);
      props.changePage(1);
    }
  }

  return (
    <div className="MoviesFilterBar">
        <input type="text"  className="filterText" onChange={handleChange} onKeyDown={handleKeyDown}  width="200" height="121" />
    </div>
  );
}

export default MoviesFilterBar;
