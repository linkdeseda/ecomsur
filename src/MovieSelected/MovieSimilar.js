import React from 'react';
import '../css/moviesimilar.css';
import {imageUrl} from '../url'

const MovieSimilar = (props) => {
    
    const FirtsMovies = props.movieSimilar.slice(0, 3);

    const SelectedMovie  = (event) =>{
      props.movieFind(event);
    }      
    
  return (
    <div className="movieSimilar">
        {
        FirtsMovies.map(function(row,i){
       
           return(
               <div className="movieSimilarImage" key={i}>
                 <img key={row.id} className ="MovieImage"  
                 onClick={() => SelectedMovie(row.id)} src={imageUrl + row.poster_path} 
                 width="150"
                 alt=''
                 />
               </div>
           )
        })
        }
    </div>
  );

}

export default MovieSimilar;
