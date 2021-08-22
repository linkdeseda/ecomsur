import '../App.css';
import React from 'react';
import _ from 'lodash';
import {imageUrl} from '../url'

const MoviesRender = (props) => {
    
  //Funcion donde se realiza el filtro de las peliculas en div que tiene 4 unidades.
    const MovieFiltered = () => {
        
        const SelectedMovie  = (event) =>{
          props.movieFind(event);
        }      

        const moviesRender = [];
        const MoviesEachRender = 12; //Determina cuantas peliculas se mostraran por div
        const movieSplit = _.chunk(props.movies, MoviesEachRender);
        for (let index = 0; index < movieSplit.length; index++) {
          moviesRender.push(
            <div key = {index} className="MovieList">
            {
                movieSplit[index].map(movie => (
                  <img key={movie.id} className ="MovieImage" 
                  onClick={() => SelectedMovie(movie.id)} 
                  src={movie.poster_path ? imageUrl + movie.poster_path : process.env.PUBLIC_URL + '/images/notFound.png'} 
                  width="150"
                  alt=''
                  />
                ))
            }
            </div>
          );
        }

        return (
          <div>
            {moviesRender}
          </div>
        );
      };

  return (
    <div className="moviesRender">
      <MovieFiltered/>
    </div>
  );

}


export default MoviesRender;
