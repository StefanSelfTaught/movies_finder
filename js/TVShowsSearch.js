(() => {
  const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';
  const searchForm = document.getElementById('searchForm');
  const inputSearch = document.getElementById('inputSearch');
  const moviesList = document.getElementById('moviesList');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const pagination = document.getElementById('pagination-container');
  const spinner = `
    <div class="mb-5 spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>`;

  inputSearch.addEventListener('input', (e) => {
    e.preventDefault();
    getMovies(e.target.value, 1);
  });

  const previousDisabled = page => {
    if(page == 1){
      previous.disabled = true;
      previous.classList.add('button-disabled');
    } else {
      previous.disabled = false;
      previous.classList.remove('button-disabled');
    }
  }

  const nextDisabled = (page, totalPages) => {
    if(page === totalPages){
      next.disabled = true;
      next.classList.add('button-disabled');
    } else {
      next.disabled = false;
      next.classList.remove('button-disabled');
    }
  }

  const getMovies = (movie, page) => {
    if(inputSearch.value.length > 0){
      moviesList.innerHTML = spinner;
    }
    previousDisabled(page);
    if(movie.length > 0) {
       fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${movie}&page=${page}`
      )
        .then(resp => resp.json())
        .then(data => {
          nextDisabled(page, data.total_pages);
          console.log(data);
          let output = '';
          let movies = data.results;
          movies.map(movie => {
            let descp;
            if(movie.overview.length > 260){
              descp = movie.overview.split(" ").splice(0, 30).join(" ") + '...';
            } else if (movie.overview == "") {
              descp = "No description";
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
                      <a href="https://www.themoviedb.org/tv/${movie.id}" target="_blank" class="btn btn-dark">More Details</a>
                    </div>
                  </div>
                </div>
              `;
            }
          })
          if(movies.length !== 0){
            moviesList.innerHTML = output;
          } else {
            moviesList.innerHTML = `<h2 class="no-results">No results founded</h2>`;
            next.disabled = true;
            next.classList.add('button-disabled');
          }
          pagination.style.visibility = 'visible';
          next.addEventListener('click', () => {
            window.scrollTo(0, 240);
            getMovies(inputSearch.value, ++page);
          });
          previous.addEventListener('click', () => {
            window.scrollTo(0, 240)
            getMovies(inputSearch.value, --page)
          });
        })
    } else {
      moviesList.innerHTML = null;
      pagination.style.visibility = 'hidden';
    }
  }
})();
