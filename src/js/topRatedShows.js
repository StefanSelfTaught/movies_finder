import { request } from './requests.js';
import '../css/index.css';
import { genres } from './showsGenres.js';
import "@babel/polyfill";

(() => {

		const moviesContainer = document.getElementById('discover-movies');

		const spinner = `
		    <div class="mb-5 spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
		      <span class="sr-only">Loading...</span>
		    </div>
		`;

		moviesContainer.innerHTML = spinner;

		request.fetchAllPopularShows('top_rated').then(data => {

			let output = '';
			let genresArray = '';

			data.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})

				let genreOutput = genresArray.map(genre => genre.name).join(", ")		
				output +=
				`
				<div onclick="o(${movie.id})" class="mb-5 mr-3 ml-3 card" id=${movie.id} style="width: 11rem;">
					<img class="card-img-lazy card-img" style="height: 16.5rem;" data-src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
						<div class="card-body">
						<h5 class="card-title card-small-title">${movie.name}</h5>
						<p class="card-text card-small-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
					</div>
				</div>
				`
			})
			if(data.length !== 0){
				moviesContainer.innerHTML = output;
			} else {
				moviesContainer.innerHTML = `<h2 class="no-results">No results founded</h2>`;

			}

		})
		.finally(() => {

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
						return
					} else {
						preloadImage(entry.target);
						entry.target.classList.add('lazy-load-fade');
						imgObserver.unobserve(entry.target);
					}
				})
			}, imgOptions)

			images.forEach(image => {
				imgObserver.observe(image);
			})

		})
})()


