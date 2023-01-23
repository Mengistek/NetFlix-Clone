import React, { useState, useEffect,} from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from 'react-youtube'
import movietrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
const [trailerUrl, setTrailerUrl]= useState("");



  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(fetchUrl);
      console.log(requests);

      setMovies(requests.data.results);
      return requests;
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);
  const opts= {
    height: "390",
    width: "100%",
    playerVars:{
      autoplay: 1,
    },
  };

  const handleClick= (movie)=>{
    if(trailerUrl){
      setTrailerUrl("");
    }else{
      movietrailer(movie?.title || movie?.name || movie.original_name)
      .then((url)=>{
        const urlParams= new URLSearchParams(new URL(url).search); 
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error)=>console.log(error));
    }
  }
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {/* What is BEM? BEM stands for Block, Element, and Modifier. It's a CSS
        naming convention for writing cleaner and more readable CSS classes. BEM
        also aims to write independent CSS blocks in order to reuse them later
        in your project. */}
        {movies.map((movie) => (
          <img
            // key={movie.id}
            onClick={()=>handleClick(movie)}

            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{padding: "40px"}}>
         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
















// import React, {useState, useEffect} from 'react';
// import './Row.css';
// import axios from './axios';

// const base_url="https://image.tmdb.org/t/p/original/";
// function Row({ title, fetchUrl }) {
//    const [movies, setMovies]=useState([]); //making initial state null
//   useEffect(() => {
//      async function fetchData() {
//      const request=await axios.get(fetchUrl);
//    //console.log(request);
//   setMovies(request.data.results);
//   return request;
//   }
//   fetchData();
//   }, [fetchUrl]);
//  // console.log(movies);
//      return (
//        <div className="row">
//          <h1>{title}</h1>
//          <div className="row__posters">
//            {movies.map((movie) => (
//              <img
//                className="row__poster"
//                src={`${base_url}${movie.poster_path}`}
//                alt={movie.name}
//              />
//            ))}
//          </div>
//        </div>
//      );
// }

// export default Row
