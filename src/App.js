import { useEffect, useState } from "react";
import "./App.css";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "6e070cdc79b34ca6fca8fddf69ffc3c6";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA3MGNkYzc5YjM0Y2E2ZmNhOGZkZGY2OWZmYzNjNiIsInN1YiI6IjY2MWFhY2RiYWY2ZTk0MDE2M2VjZmQ2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W_Il9OE8rB0fPaRAxTsJPJjanV6t53bQWX0UxLGxUwM",
  },
};

/* const imageUrls = [
  {
    id: "693134",
    Poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: "1011985",
    Poster: "https://image.tmdb.org/t/p/w500/f7QBvIzoWSJw3jWPGnZBc5vwQ0l.jpg",
  },
  {
    id: "823464",
    Poster: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
  },
  {
    id: "693134",
    Poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: "1011985",
    Poster: "https://image.tmdb.org/t/p/w500/f7QBvIzoWSJw3jWPGnZBc5vwQ0l.jpg",
  },
  {
    id: "823464",
    Poster: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
  },
  {
    id: "693134",
    Poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: "1011985",
    Poster: "https://image.tmdb.org/t/p/w500/f7QBvIzoWSJw3jWPGnZBc5vwQ0l.jpg",
  },
  {
    id: "823464",
    Poster: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
  },
  {
    id: "693134",
    Poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
]; */

export default function App() {
  let year = new Date().getFullYear();
  const [movies, setMovies] = useState([]);
  const [moviesBanner, setMoviesBanner] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      const tagLineElement = document.getElementById("header__tag");
      const genreToReplace = [
        { genre: "Action", colorClass: "action" },
        { genre: "Horrer", colorClass: "horrer" },
        { genre: "Drama", colorClass: "drama" },
        { genre: "Thriller", colorClass: "thriller" },
        { genre: "Comedy", colorClass: "comedy" },
        { genre: "Romance", colorClass: "romance" },
        { genre: "Adventure", colorClass: "adventure" },
      ];
      let index = 0;

      const interval = setInterval(() => {
        index = (index + 1) % genreToReplace.length;
        const { genre, colorClass } = genreToReplace[index];
        tagLineElement.textContent = genre;
        tagLineElement.className = colorClass;
      }, 3000);

      async function fetchMovies() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=${year}?api_key=${API_KEY}`,
            options,
            { signal: controller.signal }
          );

          const data = await res.json();
          const firstTenRecords = await data.results.slice(0, 10);
          // console.log(data.results);
          console.log(firstTenRecords);
          setMovies(data.results);
          setMoviesBanner(firstTenRecords);
        } catch (error) {}
      }

      fetchMovies();
      return () => {
        clearInterval(interval);
        document.title = "showSpotter";
        controller.abort();
      };
    },
    [year]
  );

  return (
    <>
      <NavBar />
      <div className="container">
        <Header movies={movies} moviesBanner={moviesBanner} />
      </div>
    </>
  );
}

function NavBar() {
  return (
    <nav>
      <div className="container">
        <div className="nav-logo">
          <img src="Images/popcorn.png" alt="" />
          <h3>showSpotter</h3>
        </div>
        <div className="nav-right">
          <input type="text" className="search" placeholder="Search IMDB..." />
        </div>
      </div>
    </nav>
  );
}

function Header({ movies, moviesBanner }) {
  return (
    <header id="home" className="home">
      <div className="header-left">
        <h1>
          Explore{" "}
          <span id="header__tag" className="action">
            Action
          </span>{" "}
          Movies & TV Shows
          <img
            src="Images/movie-svgrepo-com.svg"
            alt=""
            className="movie-icon"
          />
        </h1>
        <p>
          Movies move us like nothing else can, whether they are scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience.
        </p>
      </div>
      <div className="header-right">
        <ul className="movies-list">
          {moviesBanner?.map((movie) => (
            <Movies movie={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    </header>
  );
}

function Movies({ movie }) {
  return (
    <li>
      <img src={`${IMG_URL + movie.poster_path}`} alt={`${movie.title}`} />
    </li>
  );
}
