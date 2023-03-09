const APIKey = "12e1094e";
const favouritesContainer = document.querySelector("#favourites");
const favHeading = document.querySelector("#fav-heading");
const favMovies = [];

// Get the movies from localStorage and push it in favMovies array
if (localStorage.favMovies) {
  let favMoviesArray = localStorage.getItem("favMovies");
  favMoviesArray = JSON.parse(favMoviesArray);
  for (let i = 0; i < favMoviesArray.length; i++) {
    favMovies.push(favMoviesArray[i]);
  }
}

// Display the movie heading dynamically
favHeading.innerHTML =
  favMovies.length !== 0
    ? "Favourite Movies"
    : "You have not added any movies to your favourites";

// Function to fetch movies
async function fetchMovies() {
  favouritesContainer.innerHTML = "";
  for (let i = 0; i < favMovies.length; i++) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${APIKey}&i=${favMovies[i]}`
    );
    const data = await response.json();

    const movie = document.createElement("div");
    movie.classList.add("fav-item");
    movie.innerHTML = `
    <a href="./movie_info.html?${data.imdbID}">
      <img
        src=${data.Poster}
        alt=${data.Title}
      />
    </a>

    <div class="fav-item-info">
      <a href="./movie_info.html?${data.imdbID}"><h4>${data.Title}</h4></a>
      <p>Year: ${data.Year}</p>
      <button class='unfav-btn-${i}'>Unfavorite</button>
    </div>
    `;

    favouritesContainer.prepend(movie);

    const unfavBtn = document.querySelector(`.unfav-btn-${i}`);

    // Function to remove the movie from favourites on click
    unfavBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let index = favMovies.indexOf(data.imdbID);
      favMovies.splice(index, 1);

      let itemToRemove = this.parentElement.parentElement;
      itemToRemove.remove();

      favHeading.innerHTML =
        favMovies.length !== 0
          ? "Favourite Movies"
          : "You have not added any movies to your favourites";

      localStorage.setItem("favMovies", JSON.stringify(favMovies));
    });
  }
}
fetchMovies();
