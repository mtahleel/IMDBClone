const APIKey = "12e1094e";
const searchInput = document.querySelector("#input");
const searchList = document.querySelector(".search-list");
const searchButton = document.querySelector("#search-button");
const main = document.querySelector("#main");
const favMovies = [];

// Get the movies from localStorage and push it in favMovies array
if (localStorage.favMovies) {
  let favMoviesArray = localStorage.getItem("favMovies");
  favMoviesArray = JSON.parse(favMoviesArray);
  for (let i = 0; i < favMoviesArray.length; i++) {
    favMovies.push(favMoviesArray[i]);
  }
}

// Get the search input value
searchInput.addEventListener("keyup", function (e) {
  main.innerHTML = "";
  const searchQuery = e.target.value;
  if (searchQuery.length > 0) {
    searchList.classList.remove("hide");
  } else {
    searchList.classList.add("hide");
  }

  // Function to fetch movies
  async function fetchMovies() {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${APIKey}&s=${searchQuery}`
    );
    const data = await response.json();
    const movies = data.Search;
    if (data.Response === "True") {
      showMoviesInSearchList(movies);
    }
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      displayMoviesOnPage(movies);
    });
  }
  fetchMovies();
});

// Function to show movies in search container
function showMoviesInSearchList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const movie = document.createElement("div");
    movie.classList.add("search-item");
    movie.innerHTML = `
    <a href='movie_info.html?${movies[i].imdbID}'>
      <img
        class="poster"
        src=${movies[i].Poster}
        alt="${movies[i].Title}"
      />
    </a>
    <div class="search-item-info">
      <a href='movie_info.html?${movies[i].imdbID}'>
        <h3>${movies[i].Title}</h3>
      </a>
      <p class="year">Year: ${movies[i].Year}</p>
      <button class='fav-btn-${i} Fav'>
        ${favMovies.includes(movies[i].imdbID) ? "Unfavourite" : "Favourite"}
      </button>
    </div>
    `;

    searchList.append(movie);

    const favBtn = document.querySelector(`.fav-btn-${i}`);
    if (favMovies.includes(movies[i].imdbID)) {
      favBtn.style.backgroundColor = "red";
    } else {
      favBtn.style.backgroundColor = "greenyellow";
    }
    favBtn.addEventListener("click", function (e) {
      e.preventDefault();
      checkIfFav(movies[i].imdbID, favBtn);
    });
  }
}

// Function to show movies in front page
function displayMoviesOnPage(movies) {
  searchList.classList.add("hide");
  main.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const movie = document.createElement("div");
    movie.classList.add("display-movie");
    movie.innerHTML = `
    <a href='./movie_info.html?${movies[i].imdbID}'>
      <img
          src="${movies[i].Poster}"
          alt="${movies[i].Title}"
      />
    </a>
    <div class="display-movie-info">
      <h3>
        <a href='./movie_info.html?${movies[i].imdbID}'>${movies[i].Title}</a>
      </h3>
      <p>Year: ${movies[i].Year}</p>
      <button class='main-fav-btn-${i}'>
        ${favMovies.includes(movies[i].imdbID) ? "Unfavourite" : "Favourite"}
      </button>
    </div>
    `;

    main.append(movie);
    const favBtn = document.querySelector(`.main-fav-btn-${i}`);
    if (favMovies.includes(movies[i].imdbID)) {
      favBtn.style.backgroundColor = "red";
    } else {
      favBtn.style.backgroundColor = "greenyellow";
    }
    favBtn.addEventListener("click", function (e) {
      e.preventDefault();
      checkIfFav(movies[i].imdbID, favBtn);
    });
  }
}

// Function to check if a movie is present in favourites
function checkIfFav(id, favBtn) {
  if (favMovies.includes(id)) {
    const index = favMovies.indexOf(id);
    favMovies.splice(index, 1);
    favBtn.innerHTML = "Favourite";
  } else {
    favMovies.push(id);
    favBtn.innerHTML = "Unfavourite";
  }

  if (favMovies.includes(id)) {
    favBtn.style.backgroundColor = "red";
  } else {
    favBtn.style.backgroundColor = "greenyellow";
  }
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
}
