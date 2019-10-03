(() => {
  const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';
  const searchForm = document.getElementById('searchForm');
  const inputSearch = document.getElementById('inputSearch');
  const moviesList = document.getElementById('moviesList');

  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getMovies(inputSearch.value);
  });

  function getMovies(movie) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        let movies = data.results;
        let output = '';
        movies.map(movie => {
          output += `
            <div class="card">
              <div class="poster">
                <img
                  src="https://image.tmdb.org/t/p/w185/${movie.poster_path}"
                />
              </div>
              <div class="details">
                <h2>${movie.title}<br /><span>Relased in: ${movie.release_date}</span></h2>
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <span>${movie.vote_average}/10</span>
                </div>
                <div class="info">
                  <p>
                    ${movie.overview}
                  </p>
                </div>
                <div class="star">
                  <button>test</button>
                  <button>test</button>
                </div>
              </div>
            </div>
          `;
        });

        $('#moviesList').html(output);
      })
      .catch(err => alert('Something went wrong!' + err));
  }
})();
