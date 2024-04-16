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
