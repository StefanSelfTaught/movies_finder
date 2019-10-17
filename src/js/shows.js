import { genres } from './showsGenres.js';
import '../css/index.css';


(() => {
	const onTheAir = document.getElementById('on-the-air');
	const popularShows = document.getElementById('popular-shows');
	const topRatedShows = document.getElementById('top-rated-shows');
	const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

	fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topRMovies = res.results;
			let output = '';
			let genresArray = '';
			topRMovies.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})
				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				output +=
					`
					<div class="mr-3 card" style="width: 20rem;">
				        <img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.name}</h5>
				          <p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
					`
			})
			setTimeout(() => {
				$('.slick-carousel-air').slick({
				  slidesToShow: 6,
				  lazyLoad: 'progressive',
				  slidesToScroll: 6,
				  infinite: false,
				  nextArrow: $('.nextAir'),
				  focusOnSelect: false,
				  prevArrow: $('.prevAir'),
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
				onTheAir.innerHTML = output;
			}, 9)
		})


	fetch('https://api.themoviedb.org/3/tv/popular?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topPopularMovies = res.results;
			let output = '';
			let genresArray = '';
			topPopularMovies.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0]  || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})
				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				if(movie.poster_path !== null){
					output +=
					`
					<div class="mr-3 card" style="width: 20rem;">
				        <img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.name}</h5>
				          <p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
					`		
				}	
			})
			setTimeout(() => {
				$('.slick-carousel-popularShows').slick({
				  slidesToShow: 6,
				  slidesToScroll: 6,
				  lazyLoad: 'progressive',
				  infinite: false,
				  nextArrow: $('.nextPopularShows'),
				  focusOnSelect: false,
				  prevArrow: $('.prevPopularShows'),
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
				popularShows.innerHTML = output;
			}, 9)
		})


		fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topPopularMovies = res.results;
			let output = '';
			let genresArray = '';
			topPopularMovies.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})
				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				output +=
				`
					<div class="mr-3 card" style="width: 20rem;">
				        <img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.name}</h5>
				          <p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
				`
			})
			setTimeout(() => {
				$('.slick-carousel-topShows').slick({
				  slidesToShow: 7,
				  slidesToScroll: 7,
				  lazyLoad: 'progressive',
				  infinite: false,
				  nextArrow: $('.nextTopShows'),
				  focusOnSelect: false,
				  prevArrow: $('.prevTopShows'),
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
				topRatedShows.innerHTML = output;
			}, 9)
		})
})()