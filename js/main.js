(() => {
  const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';
  const searchForm = document.getElementById('searchForm');
  const inputSearch = document.getElementById('inputSearch');
  const moviesList = document.getElementById('moviesList');

  inputSearch.addEventListener('input', (e) => {
    e.preventDefault();
    getMovies(e.target.value);
  });

  function getMovies(movie) {
    if(movie.length > 0) {
       fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`
      )
        .then(resp => resp.json())
        .then(data => {
          let output = '';
          let movies = data.results;
          movies.map(movie => {
            console.log(movie);
            let descp;
            if(movie.overview.length > 260){
              descp = movie.overview.split(" ").splice(0, 30).join(" ") + '...';
            } else {
              descp = movie.overview;
            }
            if(movie.poster_path !== null) {
            output += `
              <div class="card mr-5">
                <div class="poster">
                  <img
                    src="https://image.tmdb.org/t/p/w185/${movie.poster_path}"
                  />
                </div>
                <div class="details">
                  <h2>${movie.title}<br /><span>Relased in: ${movie.release_date}</span></h2>
                  <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.vote_average} / 10</span>
                  </div>
                  <div class="info">
                    <p>
                      ${descp}
                    </p>
                  </div>
                  <div class="more-info">
                    <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="btn btn-dark">More Details</a>
                  </div>
                </div>
              </div>
            `;
            }
          })
          $('#moviesList').html(output);
        })
    } else {
      $('#moviesList').empty();
    }
  }
})();
