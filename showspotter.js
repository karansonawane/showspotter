document.addEventListener("DOMContentLoaded", function () {
  const tag = document.getElementById("header__tag");
  const genreToReplace = [
    { genre: "Action", colorClass: "action" },
    { genre: "Horrer", colorClass: "horrer" },
    { genre: "Drama", colorClass: "drama" },
    { genre: "Thriller", colorClass: "thriller" },
    { genre: "Comedy", colorClass: "comedy" },
    { genre: "Romance", colorClass: "romance" },
    { genre: "Adventure", colorClass: "adventure" },
  ];

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % genreToReplace.length;
    const { genre, colorClass } = genreToReplace[currentIndex];
    tag.textContent = genre;
    tag.className = colorClass;
  }, 2000);
});

const KEY = "fe57d955";

fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${"Don"}&y=${2024}`)
  .then((res) => res.json())
  .then((data) => console.log(data.Search));

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA3MGNkYzc5YjM0Y2E2ZmNhOGZkZGY2OWZmYzNjNiIsInN1YiI6IjY2MWFhY2RiYWY2ZTk0MDE2M2VjZmQ2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W_Il9OE8rB0fPaRAxTsJPJjanV6t53bQWX0UxLGxUwM",
  },
};

// Top Rated
/* fetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=6e070cdc79b34ca6fca8fddf69ffc3c6",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response.results)); */

//  Released current year
fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=2024?api_key=6e070cdc79b34ca6fca8fddf69ffc3c6",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response.results));
