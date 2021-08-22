import React from 'react';
import {imageUrl} from '../url'
import '../css/movieDetails.css';

const MovieDetails = (props) => {

  return (
    <div className="movieDetails">

        <div className="selectedMovieImage">
            <img className ="SelectedMovie" 
            src={props.movie.poster_path ? imageUrl + props.movie.poster_path : process.env.PUBLIC_URL + '/images/notFound.png'}
            width="150"
            alt=''
            />
        </div>

        <div className="selectedMovieInfo">
            <div className="SelectedMovieTitulo">
              {props.movie.original_title}
            </div>

            <div className="SelectedMovieFecha">
                {props.movie.release_date}
            </div>

            <div className="SelectedMovieVoto">
                <strong>Votos:</strong> {props.movie.vote_count}
            </div>

            <div className="SelectedMovieGeneroTitulo">
              Generos:
            </div>

            <div className="SelectedMovieGeneros">
               {
                   props.movie.genres.map((row,index) => (
                    <div key={index}> {row.name}</div>
                   ))
               }
            </div>

            <div className="SelectedMovieOverviewtitle">
               VISTA GENERAL
            </div>
            
            <div className="SelectedMovieOverview">
                {props.movie.overview}
            </div>
            
        </div>
    </div>
  );

}

export default MovieDetails;
