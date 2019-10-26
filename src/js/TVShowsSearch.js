import * as variables from './variables.js';
import { genres } from './showsGenres.js';
import '../css/index.css';


(() => {

  fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=ce2eb2231a371296cf6ff11a39206d6e')
    .then(data => data.json())
    .then(res => {
      let topRMovies = res.results;
      let output = '';
      let genresArray = '';
      topRMovies.map(movie => {
        genresArray = genres.filter(genre => {
          if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1] || genre.id === movie.genre_ids[2]){
            return genre.id;
          }
        })
        let genreOutput = genresArray.map(genre => genre.name).join(", ");
        output +=
          `
          <div class="mr-3 card" style="width: 15rem; padding-bottom: 0;">
              <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title card-small-title">${movie.name}</h5>
                <p class="card-text card-small-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
              </div>
          </div>
          `
      })
      setTimeout(() => {
        $('.slick-trending-shows').slick({
          slidesToShow: 8,
          lazyLoad: 'progressive',
          slidesToScroll: 8,
          infinite: false,
          nextArrow: $('.nextTrendingShows'),
          focusOnSelect: false,
          prevArrow: $('.prevTrendingShows'),
          responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
            {
              breakpoint: 750,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
        });
      }, 10)
      setTimeout(() => {
         variables.trending2.innerHTML = output;
      }, 9)
    })

  variables.inputSearch.addEventListener('input', (e) => {
    e.preventDefault();
    getMovies(e.target.value, 1);
  });

  const previousDisabled = page => {
    if(page == 1){
      variables.previous.disabled = true;
      variables.previous.classList.add('button-disabled');
    } else {
      variables.previous.disabled = false;
      variables.previous.classList.remove('button-disabled');
    }
  }

  const nextDisabled = (page, totalPages) => {
    if(page === totalPages){
      variables.next.disabled = true;
      variables.next.classList.add('button-disabled');
    } else {
      variables.next.disabled = false;
      variables.next.classList.remove('button-disabled');
    }
  }

  const getMovies = (movie, page) => {
    if(variables.inputSearch.value.length > 0){
      variables.moviesList.innerHTML = variables.spinner;
    }
    previousDisabled(page);
    if(movie.length > 0) {
    document.getElementById('slider-shows-search').style.display = 'none';
       fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${variables.apiKey}&query=${movie}&page=${page}`
      )
        .then(resp => resp.json())
        .then(data => {
          nextDisabled(page, data.total_pages);
          console.log(data);
          let output = '';
          let movies = data.results;
          movies.map(movie => {
            let descp;
            if(movie.overview.length > 200){
              descp = movie.overview.split(" ").splice(0, 30).join(" ") + '...';
            } else if (movie.overview == "") {
              descp = "No description";
            } else {
              descp = movie.overview;
            }
            if(movie.poster_path !== null) {
              output += `
                <div class="card-v2">
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
            variables.moviesList.innerHTML = output;
          } else {
            variables.moviesList.innerHTML = `<h2 class="no-results">No results founded</h2>`;
            variables.next.disabled = true;
            variables.next.classList.add('button-disabled');
          }
           variables.pagination.style.visibility = 'visible';
           variables.next.addEventListener('click', () => {
            window.scrollTo(0, 240);
            getMovies(variables.inputSearch.value, ++page);
          });
          previous.addEventListener('click', () => {
            window.scrollTo(0, 240);
            getMovies(variables.inputSearch.value, --page)
          });
        })
    } else {
      document.getElementById('slider-shows-search').style.display = 'block';
      variables.moviesList.innerHTML = null;
      variables.pagination.style.visibility = 'hidden';
    }
  }
})();
