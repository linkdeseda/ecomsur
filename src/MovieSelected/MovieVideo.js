import React from 'react';
import '../css/movieVideo.css';

const MovieVideo = (props) => {
    
    const lastElement = props.movieVideo.results[props.movieVideo.results.length - 1];

  return (
    <div className="movieVideo">

            <div className="youtubeTitle">
                Trailer
            </div>
        {
            lastElement ?
             
            <div className="youtubeVideo">
                <iframe src={'https://www.youtube.com/embed/'+lastElement.key}
                    frameBorder='0'
                    title='video'
                    width='60%'
                    height='250px'
                />
            </div>
             
            :
             
             <div className ="noVideo">
                <img src={process.env.PUBLIC_URL + '/images/notFound.png'} alt='' /> 
             </div>   
        }
     
    </div>
  );

}

export default MovieVideo;
