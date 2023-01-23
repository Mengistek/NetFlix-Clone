import axios from "axios";


const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
// instance.get("/movie/top_rated");

// api.themoviedb.org/3/movie/top_rated which is we get this

export default instance;



























// import axios from "axios";
// const instance = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
// });

// // instance.get("/movie/top_rated?");
// export default instance;
