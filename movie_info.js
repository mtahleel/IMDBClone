const APIKey = "12e1094e";
const movieDetails = document.querySelector("#movie-details");

// Get the movie id from url
const url = location.href;
const urlArray = url.split("?");
const id = urlArray.at(-1);

// Function to fetch movies
async function fetchMovieDetails(id) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${APIKey}&i=${id}`
  );
  const data = await response.json();

  movieDetails.innerHTML = "";
  const movie = document.createElement("div");
  movie.classList.add("movie-info");
  movie.innerHTML = `
    <img
        src=${data.Poster}
        alt=${data.Title}
    />
    <div class="info">
        <h1>${data.Title}</h1>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Production:</strong> ${data.Production}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Language:</strong> ${data.Language}</p>
        <p><strong>Released:</strong> ${data.Released}</p>
        <p><strong>Runtime:</strong> ${data.Runtime}</p>
        <p><strong>Year:</strong> ${data.Year}</p>
        <p><strong>IMDB </strong>ratings: ${data.imdbRating}</p>
    </div>
  `;

  movieDetails.appendChild(movie);
}
fetchMovieDetails(id);
