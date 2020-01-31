import { genres } from './includes/moviesGenres.js';
import { request } from './includes/requests.js';
import '@babel/polyfill';

(() => {

		const moviesContainer = document.getElementById('discover-movies');

		const spinner = `
		    <div class="mb-5 spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
		      <span class="sr-only">Loading...</span>
		    </div>
		`;

		moviesContainer.innerHTML = spinner;

		request.fetchAllTypeMovies('now_playing').then(data => {

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
				<div onclick="e(${movie.id})" class="mb-5 mr-3 ml-3 card" id=${movie.id} style="width: 11rem;">
					<img class="card-img-lazy" style="height: 16.5rem;" data-src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.name}">
					<div class="card-body">
					<h5 class="card-title card-small-title">${movie.title}</h5>
					<p class="card-text card-small-details">${movie.release_date.split("-")[0]} | ${genreOutput}</p>
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
						return
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
})()


