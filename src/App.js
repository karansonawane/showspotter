import { useState } from "react";
import "./App.css";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const imageUrls = [
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
];

export default function App() {
  const [movies, setMovies] = useState(imageUrls);
  return (
    <>
      <NavBar />
      <div className="container">
        <Header movies={movies} />
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

function Header({ movies }) {
  return (
    <header id="home" className="home">
      <div className="header-left">
        <h1>
          Explore <span id="header__tag">Action</span> Movies & TV Shows
          <img
            src="Images/movie-svgrepo-com.svg"
            alt=""
            className="movie-icon"
          />
        </h1>
        <p>
          Movies move us like nothing else can, whether they are scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience
        </p>
      </div>
      <div className="header-right">
        <ul className="movies-list">
          {movies?.map((movie) => (
            <Movies movie={movie} />
          ))}
        </ul>
      </div>
    </header>
  );
}

function Movies({ movie }) {
  return (
    <li>
      <img src={movie.Poster} key={movie.id} alt="" />
    </li>
  );
}
