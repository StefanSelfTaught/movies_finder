import { genres } from './moviesGenres.js';
import '../css/index.css';
import request from './requests.js';
import "@babel/polyfill";

(() => {

	// function abc() {
	// 	console.log('apel f abc');
	// 	return new Promise((resolve, reject) => {
	// 		console.log('in')
	// 		let x = 1;
	// 		let y = 2;
	// 		if(x === y){
	// 			resolve({r: 1})
	// 		} else {
	// 			reject({r: 2})
	// 		}
	// 	})
	// }

	// console.log(1);

	// // console.log(abc());

	// console.log(2);

	// async function doWork(){
	// 	let result = await abc()
	// 	console.log(result);
	// }

	// doWork()

	const topMovies = document.getElementById('top-rated-movies');
	const popularMovies = document.getElementById('popular-movies');
	const nowPlaying = document.getElementById('now-playing');
	const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

	async function fetchTopMovies() {
		const request = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		const res = await request.json();
		const data = await res.results;
		let output = '';
		let genresArray = '';
		data.map(movie => {
			genresArray = genres.filter(genre => {
				if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
					return genre.id;
				}
			})

			let genreOutput = genresArray.map(genre => genre.name).join(", ");
			output +=
				`
				<div onclick="test(${movie.id})" class="mr-3 card" id=${movie.id} style="width: 20rem;">
					    <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
					    <div class="card-body">
					        <h5 class="card-title card-movie-title">${movie.title}</h5>
					        <p class="card-text card-details">${movie.release_date.split("-")[0]} | ${genreOutput}</p>
					    </div>
      			</div>
				`
			})
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
	}

	fetchTopMovies()

	async function fetchPopularMovies(){
		const request = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		const res = await request.json();
		const data = await res.results;
		let output = '';
		let genresArray = '';
		data.map(movie => {
			genresArray = genres.filter(genre => {
				if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
					return genre.id;
				}
			})
			let genreOutput = genresArray.map(genre => genre.name).join(", ");
			output +=
				`
				<div onclick="test(${movie.id})" class="mr-3 card" style="width: 20rem;">
				    <img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}">
				    <div class="card-body">
				        <h5 class="card-title card-movie-title">${movie.title}</h5>
				        <p class="card-text card-details">${movie.release_date.split("-")[0]} | ${genreOutput} </p>
				    </div>
      			</div>
				`		
		})
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
	}

	fetchPopularMovies()

	async function fetchMovies(){
		const request = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		const res = await request.json();
		const data = await res.results;
		let output = '';
		let genresArray = '';
		data.map(movie => {
			genresArray = genres.filter(genre => {
				if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
					return genre.id;
				}
			})
			let genreOutput = genresArray.map(genre => genre.name).join(", ");
			output +=
				`
				<div onclick="test(${movie.id})" class="mr-3 card" style="width: 20rem;">
				    <img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=${movie.title}>
				    <div class="card-body">
				        <h5 class="card-title card-movie-title">${movie.title}</h5>
				        <p class="card-text card-details">${movie.release_date.split("-")[0]} | ${genreOutput} </p>
				    </div>
      			</div>
				`
			})
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
		}

		fetchMovies();

})()
