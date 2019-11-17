import { genres } from './showsGenres.js';
import '../css/index.css';
import "@babel/polyfill";
import { request } from './requests.js';

(() => {

	const onTheAir = document.getElementById('on-the-air');
	const popularShows = document.getElementById('popular-shows');
	const topRatedShows = document.getElementById('top-rated-shows');

	request.fetchAirShows().then(data => {
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
			<div onclick="e(${movie.id})" class="mr-3 card" style="width: 20rem;">
				<img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
					<div class="card-body">
					<h5 class="card-title card-movie-title">${movie.name}</h5>
					<p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				</div>
			</div>
			`
		})
		onTheAir.innerHTML = output;
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
	})

	request.fetchPopularShows().then(data => {
		let output = '';
		let genresArray = '';
		data.results.map(movie => {
			genresArray = genres.filter(genre => {
				if(genre.id === movie.genre_ids[0]  || genre.id === movie.genre_ids[1]){
					return genre.id;
				}
			})
			let genreOutput = genresArray.map(genre => genre.name).join(", ");
			if(movie.poster_path !== null){
				output +=
				`
				<div onclick="e(${movie.id})" class="mr-3 card" style="width: 20rem;">
					<img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
						<div class="card-body">
						<h5 class="card-title card-movie-title">${movie.name}</h5>
						<p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
					</div>
				</div>
				`		
			}	
		})
		popularShows.innerHTML = output;
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
	})

	request.fetchTopShows().then(data => {
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
			<div onclick="e(${movie.id})" class="mr-3 card" style="width: 20rem;">
				<img class="card-img-top card-img" data-lazy="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
					<div class="card-body">
					<h5 class="card-title card-movie-title">${movie.name}</h5>
					<p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				</div>
			</div>
			`
		})
		topRatedShows.innerHTML = output;
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
	})
})()