(() => {
  const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';
  const searchForm = document.getElementById('searchForm');
  const inputSearch = document.getElementById('inputSearch');
  const moviesList = document.getElementById('moviesList');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');

  inputSearch.addEventListener('input', (e) => {
    e.preventDefault();
    getMovies(e.target.value, 1);
  });

  function getMovies(movie, page) {
    if(page == 1){
      previous.disabled = true;
      previous.classList.add('button-disabled');
    } else {
      previous.disabled = false;
      previous.classList.remove('button-disabled');
    }
    if(movie.length > 0) {
       fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${movie}&page=${page}`
      )
        .then(resp => resp.json())
        .then(data => {
          if(page === data.total_pages){
            next.disabled = true;
            next.classList.add('button-disabled');
          } else {
            next.disabled = false;
            next.classList.remove('button-disabled');
          }
          console.log(data);
          let output = '';
          let movies = data.results;
          movies.map(movie => {
            let descp;
            if(movie.overview.length > 260){
              descp = movie.overview.split(" ").splice(0, 30).join(" ") + '...';
            } else {
              descp = movie.overview;
            }
            if(movie.poster_path !== null) {
            output += `
              <div class="card">
                <div class="poster">
                  <img
                    src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                  />
                </div>
                <div class="details">
                  <h2>${movie.name}<br /><span>First Air Date: ${movie.first_air_date}</span></h2>
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
          document.getElementById('pagination-container').style.visibility = 'visible';
          next.addEventListener('click', () => {
            $(window).scrollTop(240);
            getMovies(inputSearch.value, ++page);
          });
          previous.addEventListener('click', () => {
            $(window).scrollTop(240);
            getMovies(inputSearch.value, --page)
          });
        })
    } else {
      $('#moviesList').empty();
      $('#pagination-container').style.visibility = 'hidden !important';
    }
  }
})();
