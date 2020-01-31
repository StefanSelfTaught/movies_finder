import { genres } from './includes/showsGenres.js';
import { request } from './includes/requests.js';
import "@babel/polyfill";

(() => {

  const spinner = `
    <div class="mb-5 spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>`;

  const spinner2 = `
    <div style="margin: 0 auto" class="mb-5 spinner-border text-light" style="width: 5rem !important; height: 5rem !important;" role="status">
      <span class="sr-only">Loading...</span>
    </div>`;

  const inputSearch = document.getElementById('inputSearch');
  const trending2 = document.getElementById('trending-shows');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const moviesList = document.getElementById('moviesList');
  const pagination = document.getElementById('pagination-container');

  trending2.innerHTML = spinner2;

  request.fetchSearchShowsDefault().then(data => {
      let output = '';
      let genresArray = '';
      data.results.map(movie => {
        genresArray = genres.filter(genre => {
          if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
            return genre.id;
          }
        })
        let genreOutput = genresArray.map(genre => genre.name).join(", ");
        output +=
          `
          <div onclick="o(${movie.id})" class="mr-3 card" style="width: 15rem; padding-bottom: 0;">
              <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title card-small-title">${movie.name}</h5>
                <p class="card-text card-small-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
              </div>
          </div>
          `
      })

        trending2.innerHTML = output;

        $('.slick-trending-shows').slick({
          slidesToShow: 8,
          lazyLoad: 'ondemand',
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
    })

  inputSearch.addEventListener('input', (e) => {
    e.preventDefault();
    getMovies(e.target.value, 1);
  });

  let page = 1;

  next.addEventListener('click', () => {
    window.scrollTo(0, 240);
    getMovies(inputSearch.value, ++page);
  });
  previous.addEventListener('click', () => {
    window.scrollTo(0, 240);
    getMovies(inputSearch.value, --page)
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

    document.getElementById('slider-shows-search').style.display = 'none';

      request.fetchSearchShows(movie, page).then(data => {
          nextDisabled(page, data.total_pages);
          let output = '';
          data.results.map(movie => {
            let descp;
            if(movie.overview.length > 200){
              descp = movie.overview.split(" ").splice(0, 30).join(" ") + '...';
            } else if (movie.overview == "") {
              descp = "No description";
            } else {
              descp = movie.overview;
            }
              output += `
                <div class="card-v2">
                  <div class="poster">
                    <img
                      data-src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                    />
                  </div>
                  <div class="details">
                    <h2>${movie.name}<br /><span>First Air Date: ${movie.first_air_date}</span></h2>
                    <div class="rating">
                      <span class="card-v2-rating>${movie.vote_average} / 10</span>
                    </div>
                    <div class="info">
                      <p>
                        ${descp}
                      </p>
                    </div>
                    <div class="more-info">
                      <a onclick="o(${movie.id})" target="_blank" class="btn btn-dark">More Details</a>
                    </div>
                  </div>
                </div>
              `;
          })
          if(data.results.length !== 0){
            moviesList.innerHTML = output;
          } else {
            moviesList.innerHTML = `<h2 class="no-results">No results founded</h2>`;
            next.disabled = true;
            next.classList.add('button-disabled');
          }
           pagination.style.visibility = 'visible';
        })
        .finally(() => {

          // Lazy-Load pentru imagni

          // Imaginile sunt prezente doar cand user-ul este in viewport-ul unde se afla acestea

          const images = document.querySelectorAll("[data-src]");

          function preloadImage(img){
            const src = img.getAttribute("data-src")
            if(!src){
              return;
            }

            img.src = src;
          }

          const imgOptions = {};

          const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach(entry => {
              if(!entry.isIntersecting) {
                return;
              } else {
                preloadImage(entry.target);
                entry.target.style.animation = 'lazyLoad .5s ease-in-out';
                imgObserver.unobserve(entry.target);
              }
            })
          }, imgOptions)

          images.forEach(image => {
            imgObserver.observe(image);
          })

        })
    } else {
      document.getElementById('slider-shows-search').style.display = 'block';
      moviesList.innerHTML = null;
      pagination.style.visibility = 'hidden';
    }
  }
})();
