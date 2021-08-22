import './App.css';
import React, {useState,useEffect,useCallback} from 'react';
import axios from 'axios';
import {apiKey} from './url'
import './css/movie.css';
import MoviesFilterBar from './Movies/MoviesFilterBar';
import MoviesRender from './Movies/MoviesRender';
import MoviesPagination from './Movies/MoviesPagination';
import MovieDetails from './MovieSelected/MovieDetails';
import MovieVideo from './MovieSelected/MovieVideo';
import MovieSimilar from './MovieSelected/MovieSimilar';

function App() {

  const [movies, setMovies] = useState('');
  const [page, setPage] = useState(1);
  const [typeMovies, setTypeMovies] = useState('popular');
  const [filterMovies, setFilterMovies] = useState('');
  const [movieFind, setMovieFind] = useState('');
  const [movieSelected, setMovieSelected] = useState('');

  //Funcion Async que hace la solicitudes a la API
  //se ejecuta cuando 1 vez al inicio y luego al hacer algun cambio en las variables:
  //page,typeMovies,filterMovies
  const moviePopular = useCallback(async () => {

    try {

    if(typeMovies){
      axios({
        url: 'https://api.themoviedb.org/3/movie/'+typeMovies+'?api_key='+apiKey+'&language=en-US&page='+page,
        method: 'get',
      }).then(function(response){
        setMovies(response.data)
      })

    } else {
      axios({
        url: 'https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&query='+filterMovies+'&page='+page,
        method: 'get',
      }).then(function(response){
        setMovies(response.data)
      })
    }

    } catch (error) {
      console.log(error);
  }
    }, [page,typeMovies,filterMovies]) 

    
  const findSelectedMovies = useCallback(async () => {

    try {
      
 
    if(movieFind){
      axios({
        url: 'https://api.themoviedb.org/3/movie/'+movieFind+'?api_key='+apiKey+'&language=en-US',
        method: 'get',
      }).then(function(response){
        let MovieSelected = response;
        axios({
          url: 'https://api.themoviedb.org/3/movie/'+MovieSelected.data.id+'/videos?api_key='+apiKey+'&language=en-US',
          method: 'get',
        }).then(function(response){
          let MovieSelectedVideo = response;
          axios({
            url: 'https://api.themoviedb.org/3/movie/'+MovieSelected.data.id+'/similar?api_key='+apiKey+'&language=en-US&page=1',
            method: 'get',
          }).then(function(response){
            const MovieSelectedAll ={
              movie : MovieSelected,
              movieVideo : MovieSelectedVideo,
              movieSimilar : response
            }
            setMovieSelected({...MovieSelectedAll})
          })    
        })
      })
    }

  } catch (error) {
      console.log(error);
  }
    }, [movieFind]) 

  useEffect(() => {
    moviePopular()
  }, [moviePopular])
    
  useEffect(() => {
    findSelectedMovies()
  }, [findSelectedMovies])

  //Renderiza:
  //Filtro de peliculas, listado y paginador.
  const GeneralMovies =() =>{
    return(
      <div>

        <MoviesFilterBar
        typeMovies={setTypeMovies} 
        filterMovies={setFilterMovies}
        updatemovies={setMovies}
        changePage= {setPage}
        />

        <MoviesRender 
        movies={movies.results}
        movieFind={setMovieFind} 
        />

        <MoviesPagination
        currentPage = {page}
        updatemovies={setMovies}
        changePage= {setPage}
        totalPage = {movies.total_pages} 
        />

      </div>
    );
  }

  const SpecificMovie=() =>{
    return(
      <div>

        <MovieDetails
         movie ={movieSelected.movie.data}
        />

        <MovieVideo
          movieVideo ={movieSelected.movieVideo.data}
        />

        <MovieSimilar
          movieSimilar ={movieSelected.movieSimilar.data.results}
          movieFind={setMovieFind} 
        />
        
      </div>
    );
  }

  return (
    <div className="App">
      <div className ="container">
        <div className="GeneralMovies">
            {movies 
          
          ?
            
          <GeneralMovies/>

          : 

          'Cargando...'

          }
        
        </div>
    
      <div className ="SelectedMovie">

        {movieSelected 
            
            ?
                
            <SpecificMovie
            />
  
            : 
  
            ''
  
          }

      </div>

     </div>
    </div>
  );
}

export default App;
