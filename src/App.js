import { useEffect, useState } from "react";
import "./App.css";

import { Link } from "react-scroll";

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
  // let year = new Date().getFullYear();
  const [movies, setMovies] = useState([]);
  const [moviesBanner, setMoviesBanner] = useState([]);
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      /* const tagLineElement = document.getElementById("header__tag");
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
            options
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          const firstTenRecords = await data.results.slice(0, 10);
          // console.log(data.results);
          // console.log(firstTenRecords);
          setMovies(data.results);
          setMoviesBanner(firstTenRecords);
        } catch (error) {}
      } */

      async function fetchMoviesByQuery() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false`,
            options,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          // if (data.Response === "false") throw new Error("Movie not found");
          // console.log(data.Response);
          console.log(data.results);
          setSearchedMovieList(data.results);
        } catch (error) {
          console.log(error.message);
        }
      }

      // fetchMovies();
      fetchMoviesByQuery();

      return () => {
        // clearInterval(interval);
        controller.abort();
        document.title = "showSpotter";
      };
    },
    [query]
  );

  return (
    <>
      <NavBar />
      <div className="container">
        <Header
          movies={movies}
          setMovies={setMovies}
          moviesBanner={moviesBanner}
          setMoviesBanner={setMoviesBanner}
        />
        <TopRatedMoviesList />
        <ReleasedCurrentYearMoviesList currentYearMovie={movies} />
        <SearchBar
          searchedMovieList={searchedMovieList}
          query={query}
          setQuery={setQuery}
        />
        <SearchedMovieList searchedMovieList={searchedMovieList} />
      </div>
    </>
  );
}

function NavBar() {
  return (
    <nav>
      <div className="container">
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={50}
          duration={200}
          className="nav-logo"
        >
          <img src="Images/popcorn.png" alt="" />
          <h3>showSpotter</h3>
        </Link>
        <div className="nav-right">
          <ul className="nav-links">
            <li className="search-btn">
              <Link
                to="searchSection"
                spy={true}
                smooth={true}
                offset={-100}
                duration={200}
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Header({ movies, setMovies, moviesBanner, setMoviesBanner }) {
  let year = new Date().getFullYear();

  useEffect(
    function () {
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
            options
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          const firstTenRecords = await data.results.slice(0, 10);
          // console.log(data.results);
          // console.log(firstTenRecords);
          setMovies(data.results);
          setMoviesBanner(firstTenRecords);
        } catch (error) {}
      }
      fetchMovies();

      return () => {
        clearInterval(interval);
      };
    },
    [year, setMovies, setMoviesBanner]
  );

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

function TopRatedMoviesList() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  useEffect(function () {
    async function fetchTopRatedMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
          options
        );

        const data = await res.json();
        // console.log(data.results);
        setTopRatedMovies(data.results);
      } catch (error) {}
    }
    fetchTopRatedMovies();
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 1110;
    console.log("left");
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 1110;
    console.log("right");
  };
  return (
    <section className="top-rated-movies" id="topRated">
      <div className="top-rated-movies-title">
        <p>Top Rated Movies</p>
      </div>
      <div className="top-rated-movies-list">
        <div onClick={slideLeft} className="left-arrow-div">
          <i className="fa-solid fa-caret-left left-arrow"></i>
        </div>
        <div onClick={slideRight} className="right-arrow-div">
          <i className="fa-solid fa-caret-right right-arrow"></i>
        </div>
        <div className="movie-list-grid-col-main">
          <ul className="movie-list-grid-col" id="slider">
            {topRatedMovies?.map((movie) => (
              <TopRatedMovies movie={movie} key={movie.id} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TopRatedMovies({ movie }) {
  const fullDate = movie.release_date;
  const year = fullDate.split("-")[0];
  return (
    <li className="row-items">
      <img
        src={`${IMG_URL + movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />
      <div className="movie-details">
        <p className="movie-title"> {movie.title} </p>
        <div className="movie-info">
          <p className="movie-year">
            <span>📅</span>
            <span> {year} </span>
          </p>
          <p className="movie-rating">
            <span>⭐</span>
            <span> {movie.vote_average} </span>
          </p>
        </div>
      </div>
    </li>
  );
}
function ReleasedCurrentYearMoviesList({ currentYearMovie }) {
  /*   const [topRatedMovies, setTopRatedMovies] = useState([]);
  useEffect(function () {
    async function fetchTopRatedMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
          options
        );

        const data = await res.json();
        console.log(data.results);
        setTopRatedMovies(data.results);
      } catch (error) {}
    }
    fetchTopRatedMovies();
  }, []); */

  const slideLeft = () => {
    let slider = document.getElementById("slider-current-year");
    slider.scrollLeft = slider.scrollLeft - 1110;
    console.log("left");
  };

  const slideRight = () => {
    let slider = document.getElementById("slider-current-year");
    slider.scrollLeft = slider.scrollLeft + 1110;
    console.log("right");
  };
  return (
    <section className="top-rated-movies" id="latestMovies">
      <div className="top-rated-movies-title">
        <p>Latest Popular Movies</p>
      </div>
      <div className="top-rated-movies-list">
        <div onClick={slideLeft} className="left-arrow-div">
          <i className="fa-solid fa-caret-left left-arrow"></i>
        </div>
        <div onClick={slideRight} className="right-arrow-div">
          <i className="fa-solid fa-caret-right right-arrow"></i>
        </div>
        <div className="movie-list-grid-col-main">
          <ul className="movie-list-grid-col" id="slider-current-year">
            {currentYearMovie?.map((movie) => (
              <MoviesListRow movie={movie} key={movie.id} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MoviesListRow({ movie }) {
  const fullDate = movie.release_date;
  const year = fullDate.split("-")[0];
  return (
    <li className="row-items">
      <img
        src={`${IMG_URL + movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />
      <div className="movie-details">
        <p className="movie-title"> {movie.title} </p>
        <div className="movie-info">
          <p className="movie-year">
            <span>📅</span>
            <span> {year} </span>
          </p>
          <p className="movie-rating">
            <span>⭐</span>
            <span> {movie.vote_average} </span>
          </p>
        </div>
      </div>
    </li>
  );
}

function SearchBar({ query, setQuery, searchedMovieList }) {
  return (
    <section id="searchBar" className="searchBar">
      <input
        type="text"
        className="search"
        placeholder="Search IMDB..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <NumResults searchedMovieList={searchedMovieList} />
    </section>
  );
}
function NumResults({ searchedMovieList }) {
  return (
    <p>
      Total Results <strong>{searchedMovieList.length}</strong>
    </p>
  );
}

function SearchedMovieList({ searchedMovieList }) {
  /*   useEffect(
    function () {
      async function fetchMoviesByQuery() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false`,
            options
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          // if (data.Response === "false") throw new Error("Movie not found");
          // console.log(data.Response);
          console.log(data.results);
          setSearchedMovieList(data.results);
        } catch (error) {
          console.log(error.message);
        }
      }

      fetchMoviesByQuery();
    },
    [query]
  ); */
  const slideLeft = () => {
    let slider = document.getElementById("slider-searched-movie");
    slider.scrollLeft = slider.scrollLeft - 1110;
    console.log("left");
  };

  const slideRight = () => {
    let slider = document.getElementById("slider-searched-movie");
    slider.scrollLeft = slider.scrollLeft + 1110;
    console.log("right");
  };
  return (
    <>
      <section className="top-rated-movies" id="searchSection">
        <div className="top-rated-movies-title">
          <p>Search Your Movies</p>
        </div>

        {searchedMovieList.length > 0 && (
          <div className="top-rated-movies-list">
            <div onClick={slideLeft} className="left-arrow-div">
              <i className="fa-solid fa-caret-left left-arrow"></i>
            </div>
            <div onClick={slideRight} className="right-arrow-div">
              <i className="fa-solid fa-caret-right right-arrow"></i>
            </div>
            <div className="movie-list-grid-col-main">
              <ul className="movie-list-grid-col" id="slider-searched-movie">
                {searchedMovieList?.map((movie) => (
                  <MoviesListRow movie={movie} key={movie.id} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
