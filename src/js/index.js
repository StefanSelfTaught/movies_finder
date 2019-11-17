import { genres } from './moviesGenres.js';
import '../css/index.css';
import '@babel/polyfill';
import { request } from './requests.js';

(() => {
  const topMovies = document.getElementById('top-rated-movies');
  const popularMovies = document.getElementById('popular-movies');
  const nowPlaying = document.getElementById('now-playing');

  request.fetchTopMovies().then(data => {
    let output = '';
    let genresArray = '';
    data.results.map(movie => {
      genresArray = genres.filter(genre => {
        if (
          genre.id === movie.genre_ids[0] ||
          genre.id === movie.genre_ids[1]
        ) {
          return genre.id;
        }
      });

      let genreOutput = genresArray.map(genre => genre.name).join(', ');
      output += `
				<div onclick="e(${movie.id})" class="mr-3 card" id=${
        movie.id
      } style="width: 20rem;">
					    <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}">
					    <div class="card-body">
					        <h5 class="card-title card-movie-title">${movie.title}</h5>
					        <p class="card-text card-details">${
                    movie.release_date.split('-')[0]
                  } | ${genreOutput}</p>
					    </div>
      			</div>
				`;
    });
    topMovies.innerHTML = output;
    $('.slick-carousel').slick({
      slidesToShow: 6,
      lazyLoad: 'progressive',
      slidesToScroll: 6,
      infinite: false,
      nextArrow: $('.nextTop'),
      focusOnSelect: false,
      prevArrow: $('.prevTop'),
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
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
  });

  request.fetchPopularMovies().then(data => {
    let output = '';
    let genresArray = '';
    data.results.map(movie => {
      genresArray = genres.filter(genre => {
        if (
          genre.id === movie.genre_ids[0] ||
          genre.id === movie.genre_ids[1]
        ) {
          return genre.id;
        }
      });
      let genreOutput = genresArray.map(genre => genre.name).join(', ');
      output += `
				<div onclick="e(${movie.id})" class="mr-3 card" style="width: 20rem;">
				    <img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }">
				    <div class="card-body">
				        <h5 class="card-title card-movie-title">${movie.title}</h5>
				        <p class="card-text card-details">${
                  movie.release_date.split('-')[0]
                } | ${genreOutput} </p>
				    </div>
      	</div>
				`;
    });

    popularMovies.innerHTML = output;
    $('.slick-carousel-popular').slick({
      slidesToShow: 6,
      slidesToScroll: 6,
      lazyLoad: 'progressive',
      infinite: false,
      nextArrow: $('.nextPopular'),
      focusOnSelect: false,
      prevArrow: $('.prevPopular'),
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
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
  });

  request.fetchPlayingMovies().then(data => {
    let output = '';
    let genresArray = '';
    data.results.map(movie => {
      genresArray = genres.filter(genre => {
        if (
          genre.id === movie.genre_ids[0] ||
          genre.id === movie.genre_ids[1]
        ) {
          return genre.id;
        }
      });
      let genreOutput = genresArray.map(genre => genre.name).join(', ');
      output += `
				<div onclick="e(${movie.id})" class="mr-3 card" style="width: 20rem;">
				    <img style="min-height: 18rem;" class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt=${movie.title}>
				    <div class="card-body">
				        <h5 class="card-title card-movie-title">${movie.title}</h5>
				        <p class="card-text card-details">${
                  movie.release_date.split('-')[0]
                } | ${genreOutput} </p>
				    </div>
      			</div>
				`;
    });
    nowPlaying.innerHTML = output;
    $('.slick-carousel-playing').slick({
      slidesToShow: 7,
      slidesToScroll: 7,
      lazyLoad: 'progressive',
      infinite: false,
      nextArrow: $('.nextPlaying'),
      focusOnSelect: false,
      prevArrow: $('.prevPlaying'),
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
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
  });
})();
